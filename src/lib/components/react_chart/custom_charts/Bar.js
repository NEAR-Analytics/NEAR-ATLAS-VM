import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function BarCustom(props) {
    const { data, options } = props;

    let primaryAxis;
    let secondaryAxes;

    if (options?.primaryAxis) {
      primaryAxis = options.primaryAxis;
      console.log("primaryAxis is in options");
    } else {
      primaryAxis = {
        getValue: (datum) => datum.primary,
      };
      console.log("primaryAxis is not in options");
    }

    if (options?.secondaryAxes) {
      secondaryAxes = options.secondaryAxes;
      console.log("secondaryAxes is in options");
    } else {
      secondaryAxes = [
        {
          getValue: (datum) => datum.secondary,
        },
      ];
      console.log("secondaryAxes is not in options");
    }



console.log("data", data);
console.log("primaryAxis", primaryAxis);
console.log("secondaryAxes", secondaryAxes);



  return (
    <>


    {/* <ResizableBox
        style={{
          background: "rgba(0, 27, 45, 0.9)",
          padding: ".5rem",
          borderRadius: "5px",
        }}
      > */}

        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: true,
          }}
        />

      {/* </ResizableBox> */}
    </>
  );
}
