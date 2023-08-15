import ResizableBox from "../ResizableBox";
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



console.log("props", props);


return (
  <>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        minHeight: "400px",
      }}
    >
      {/* <div
        style={{
          flex: "0 0 auto",
          padding: "10px",
        }}
      >
        {options.HeaderTitle}
      </div> */}
      <div
        style={{
          flex: 2,
          minHeight: options.minHeight,

        }}
      >
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: true,

          }}
        />
      </div>
    </div>
  </>
);

}
