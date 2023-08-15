import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function Bubble() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "linear",
    useR: true,
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
        elementType: "bubble",
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
            interactionMode: "closest",
            getDatumStyle: (datum) => ({
              circle: { r: datum.originalDatum.radius },
            }),
          }}
        />
      </ResizableBox>
    </>
  );
}
