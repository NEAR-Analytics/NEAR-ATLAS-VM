import React from "react";


import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";





export const BasicTable = (props) => {
    const { columns, data , sortFns } = props;

  const theme = useTheme(getTheme());

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: sortFns,
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }


  return (
    <>
      <CompactTable columns={columns} data={data} theme={theme} sort={sort} />

    </>
  );
};

