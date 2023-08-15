// import "./styles.css";
import React from "react";

//

import Area from "./components/Area";
import Band from "./components/Band";
import Bar from "./components/Bar";
import BarStacked from "./components/BarStacked";
import Bubble from "./components/Bubble";
import CustomStyles from "./components/CustomStyles";
import DarkMode from "./components/DarkMode";
import DynamicContainer from "./components/DynamicContainer";
import InteractionMode from "./components/InteractionMode";
import Line from "./components/Line";
import MultipleAxes from "./components/MultipleAxes";
import BarHorizontal from "./components/BarHorizontal";
import BarHorizontalStacked from "./components/BarHorizontalStacked";

// help me import as as BarCustom
// no change the variable name while importing
//
// import BarCustom from "./custom_charts/Bar";

import BarCustom from "./custom_charts/Bar";


const components = {
  "Line": Line,
  "Bar": Bar,
  "Bar (Stacked)": BarStacked,
  "Bar (Horizontal)": BarHorizontal,
  "Bar (Horizontal + Stacked)": BarHorizontalStacked,
  "Band": Band,
  "Area": Area,
  "Bubble": Bubble,
  "Multiple Axes": MultipleAxes,
  "Interaction Modes": InteractionMode,
  "Dark Mode": DarkMode,
  "Dynamic / Overflow Container": DynamicContainer,
  "Custom Styles": CustomStyles,

};




export const ReactChart = (props) => {
    const { chart_name, options, data } = props;


    return (
      <>
        {/* only show by chart_name */}
        {/* {chart_name === "Line" && <Line options={options} data={data} />}
        {chart_name === "Bar" && <Bar options={options} data={data} />}
        {chart_name === "Bar (Stacked)" && <BarStacked options={options} data={data} />}
        {chart_name === "Bar (Horizontal)" && <BarHorizontal options={options} data={data} />}
        {chart_name === "Bar (Horizontal + Stacked)" && <BarHorizontalStacked options={options} data={data} />}
        {chart_name === "Band" && <Band options={options} data={data} />}
        {chart_name === "Area" && <Area options={options} data={data} />}
        {chart_name === "Bubble" && <Bubble options={options} data={data} />}
        {chart_name === "Multiple Axes" && <MultipleAxes options={options} data={data} />}
        {chart_name === "Interaction Modes" && <InteractionMode options={options} data={data} />}
        {chart_name === "Dark Mode" && <DarkMode options={options} data={data} />}
        {chart_name === "Dynamic / Overflow Container" && <DynamicContainer options={options} data={data} />}
        {chart_name === "Custom Styles" && <CustomStyles options={options} data={data} />} */}

        {chart_name === "BarCustom" && <BarCustom options={options} data={data} />}

        {chart_name === "Line" && <Line />}
        {chart_name === "Bar" && <Bar />}
        {chart_name === "Bar (Stacked)" && <BarStacked />}
        {chart_name === "Bar (Horizontal)" && <BarHorizontal />}
        {chart_name === "Bar (Horizontal + Stacked)" && <BarHorizontalStacked />}
        {chart_name === "Band" && <Band />}
        {chart_name === "Area" && <Area />}
        {chart_name === "Bubble" && <Bubble />}
        {chart_name === "Multiple Axes" && <MultipleAxes />}
        {chart_name === "Interaction Modes" && <InteractionMode />}
        {chart_name === "Dark Mode" && <DarkMode />}
        {chart_name === "Dynamic / Overflow Container" && <DynamicContainer />}
        {chart_name === "Custom Styles" && <CustomStyles />}



      </>
    );
  }