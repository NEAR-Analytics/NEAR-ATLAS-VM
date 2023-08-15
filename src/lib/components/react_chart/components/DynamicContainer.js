import useDemoConfig from "../useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function DyanmicContainer() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
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
      <p>
        This example demos a chart's ability to position itself responsively in
        elements while respecting the box-model (margin, padding, and borders).
        It also showcases the tooltip's ability to portal outside of an overflow
        element (the blue border-box).
      </p>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          border: "2px solid black",
          height: "400px",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            padding: "10px",
            border: "1px solid red",
          }}
        >
          Header
        </div>
        <div
          style={{
            flex: 2,
            border: "5px solid blue",
            maxHeight: "400px",
            margin: "10px",
            overflow: "hidden",
          }}
        >
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </div>
      </div>
    </>
  );
}
