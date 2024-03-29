import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function MultipleAxes() {
  const { data, randomizeData } = useDemoConfig({
    series: 6,
    dataType: "time",
  });

  data.forEach((d, i) => (d.secondaryAxisId = i > 2 ? "2" : undefined));

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
      // Pad the automatically detected time scale with half of the band-size
      padBandRange: true,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "bar",
        // stacked: true,
      },
      {
        id: "2",
        getValue: (datum) => datum.secondary,
        elementType: "line",
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
