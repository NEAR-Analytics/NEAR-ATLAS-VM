import React, { useCallback, useEffect, useState } from "react";
import {
  asyncCommit,
  prepareCommit,
  requestPermissionAndCommit,
} from "../data/commitData";
import {
  computeWritePermission,
  displayNear,
  Loading,
  StorageCostPerByte,
} from "../data/utils";
import Modal from "react-bootstrap/Modal";
import { Markdown } from "./Markdown";
import { useNear } from "../data/near";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useCache } from "../data/cache";
import { useAccountId } from "../data/account";

const jsonMarkdown = (data) => {
  const json = JSON.stringify(data, null, 2);
  return `\`\`\`json
${json}
\`\`\``;
};

const StorageDomain = {
  page: "commit",
};

const StorageType = {
  WritePermission: "write_permission",
};

export const CommitModal = (props) => {
  const near = useNear();
  const accountId = useAccountId();
  const cache = useCache();

  const [asyncCommitStarted, setAsyncAsyncCommitStarted] = useState(false);
  const [extraStorage, setExtraStorage] = useState(0);
  const [commitInProgress, setCommitInProgress] = useState(false);

  const [lastData, setLastData] = useState(null);
  const [commit, setCommit] = useState(null);

  const [writePermission, setWritePermission] = useState(null);
  const [giveWritePermission, setGiveWritePermission] = useState(true);

  const showIntent = props.show;
  const onHide = props.onHide;
  const onCancel = () => {
    if (props.onCancel) {
      try {
        props.onCancel();
      } catch (e) {
        console.error(e);
      }
    }
    onHide();
  };
  const data = props.data;
  const force = props.force;
  const widgetSrc = props.widgetSrc;

  useEffect(() => {
    if (widgetSrc) {
      setWritePermission(null);
      cache
        .asyncLocalStorageGet(StorageDomain, {
          widgetSrc,
          accountId,
          type: StorageType.WritePermission,
        })
        .then((wp) => setWritePermission(wp));
    } else {
      setWritePermission(false);
    }
  }, [widgetSrc, accountId, cache, showIntent]);

  useEffect(() => {
    setGiveWritePermission(writePermission !== false);
  }, [writePermission]);

  useEffect(() => {
    if (commitInProgress || !showIntent || !accountId || !near) {
      return;
    }
    const jdata = JSON.stringify(data ?? null);
    if (!force && jdata === lastData) {
      return;
    }
    setLastData(jdata);
    setCommit(null);
    prepareCommit(near, accountId, data, force).then(setCommit);
  }, [commitInProgress, data, lastData, force, near, accountId, showIntent]);

  const onCommit = async () => {
    setCommitInProgress(true);

    const newWritePermission =
      giveWritePermission &&
      computeWritePermission(writePermission, commit.data[accountId]);
    cache.localStorageSet(
      StorageDomain,
      {
        widgetSrc,
        accountId,
        type: StorageType.WritePermission,
      },
      newWritePermission
    );
    setWritePermission(newWritePermission);

    const deposit = commit.deposit.add(StorageCostPerByte.mul(extraStorage));
    if (commit.permissionGranted) {
      await asyncCommit(near, commit.data, deposit);
    } else {
      if (accountId === near.accountId) {
        await requestPermissionAndCommit(near, commit.data, deposit);
      } else {
        // No permission for another account and not the owner. Can't commit.
        alert("No permission to commit under given account");
      }
    }
    setCommit(null);
    setLastData(null);
    if (props.onCommit) {
      try {
        props.onCommit(commit.data);
      } catch (e) {
        console.error(e);
      }
    }
    cache.invalidateCache(near, commit.data);
    onHide();
    setCommitInProgress(false);
  };

  const cantCommit =
    commit && !commit.permissionGranted && accountId !== near.accountId;

  if (
    !commitInProgress &&
    !cantCommit &&
    !asyncCommitStarted &&
    commit &&
    showIntent &&
    writePermission &&
    commit.data
  ) {
    const deposit = commit.deposit.add(StorageCostPerByte.mul(extraStorage));
    if (deposit.eq(0) && commit.permissionGranted) {
      if (
        JSON.stringify(
          computeWritePermission(writePermission, commit.data[accountId])
        ) === JSON.stringify(writePermission)
      ) {
        setAsyncAsyncCommitStarted(true);
        onCommit().then(() => setAsyncAsyncCommitStarted(false));
      }
    }
  }

  const show =
    !!commit && showIntent && !asyncCommitStarted && writePermission !== null;
    if (!show) return null;
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40">
        <div className="bg-white rounded-lg overflow-y-auto max-h-full w-3/4 z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h5 className="text-lg font-medium">Saving data</h5>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              &times;
            </button>
          </div>
          <div className="p-4">


        {cantCommit ? (
          <div>
            <h5>
              Can't commit, because the account {near.accountId} doesn't have
              permission to write under pretended account {accountId}
            </h5>
          </div>
        ) : commit ? (
          <div>
            <div>
              {commit.data ? (
                <Markdown text={jsonMarkdown(commit.data)} />
              ) : (
                <h5>No new data to save</h5>
              )}
            </div>
            {commit.data && commit?.deposit?.gt(0) && (
              <div>
                <h6>
                  Required storage deposit{" "}
                  <small className="text-secondary">
                    (can be recovered later)
                  </small>
                </h6>
                <div className="mb-2">
                  {commit.deposit.div(StorageCostPerByte).toFixed(0)} bytes ={" "}
                  {displayNear(commit.deposit)}
                </div>
                <h6>
                  Optional storage deposit{" "}
                  <small className="text-secondary">
                    (can be used to avoid future wallet TX confirmation)
                  </small>
                </h6>
                <div>
                  <ToggleButtonGroup
                    type="radio"
                    name="storageDeposit"
                    value={extraStorage}
                    onChange={setExtraStorage}
                    disabled={commitInProgress}
                  >
                    <ToggleButton
                      id="esd-0"
                      variant="outline-success"
                      value={0}
                    >
                      No Deposit
                    </ToggleButton>
                    <ToggleButton
                      id="esd-5000"
                      variant="outline-success"
                      value={5000}
                    >
                      0.05 NEAR (5Kb)
                    </ToggleButton>
                    <ToggleButton
                      id="esd-20000"
                      variant="outline-success"
                      value={20000}
                    >
                      0.2 NEAR (20Kb)
                    </ToggleButton>
                    <ToggleButton
                      id="esd-100000"
                      variant="outline-success"
                      value={100000}
                    >
                      1 NEAR (100Kb)
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            )}
            {!cantCommit && widgetSrc && commit.data && (
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="dont-ask-for-widget"
                  checked={giveWritePermission}
                  onChange={(e) => {
                    setGiveWritePermission(e.target.checked);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="dont-ask-for-widget"
                >
                  Don't ask again for saving similar data by{" "}
                  <span className="font-monospace">{widgetSrc}</span>
                </label>
              </div>
            )}
          </div>
        ) : (
          Loading
        )}



          </div>
          <div className="flex justify-between p-4 border-t border-gray-200">
            <button
              className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
              disabled={!commit?.data || commitInProgress || cantCommit}
              onClick={(e) => {
                e.preventDefault();
                onCommit();
              }}
            >
              {commitInProgress ? "Loading..." : "Save Data"}
            </button>
            <button
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-100"
              onClick={onCancel}
              disabled={commitInProgress}
            >
              Close
            </button>
          </div>
        </div>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30" onClick={onCancel}></div>
      </div>
    );
};

export const CommitButton = (props) => {
  const accountId = useAccountId();

  const {
    data,
    children,
    onClick,
    onCommit,
    onCancel,
    disabled,
    widgetSrc,
    force,
    ...rest
  } = props;

  const [computedData, setComputedData] = useState(null);

  return (
    <>
      <button
        {...rest}
        className={`px-4 py-2 ${disabled || !data || !!computedData || !accountId ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"} rounded-md`}
        onClick={(e) => {
          e.preventDefault();
          setComputedData(typeof data === "function" ? data() : data);
          if (onClick) {
            onClick();
          }
        }}
      >
        {!!computedData ? "Loading..." : children}
      </button>
      <CommitModal
        show={!!computedData}
        widgetSrc={widgetSrc}
        data={computedData}
        force={force}
        onHide={() => setComputedData(null)}
        onCancel={onCancel}
        onCommit={onCommit}
      />
    </>
  );
};
