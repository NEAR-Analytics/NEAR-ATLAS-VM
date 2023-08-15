import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function Bar() {
  const { data, randomizeData } = useDemoConfig({
    series: 3,
    dataType: "ordinal",
  });

  const primaryAxis = React.useMemo(
    () => ({
      position: "left",
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        position: "bottom",
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );


  console.log("data", data);
  console.log("primaryAxis", primaryAxis);
  console.log("secondaryAxes", secondaryAxes);


  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
