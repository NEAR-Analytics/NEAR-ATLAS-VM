import React from 'react';

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Bubble } from 'react-chartjs-2';

  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);


  export const BubbleEl = (props) => {
    const { options, data } = props;
    return (
        <Bubble options={options} data={data} />
    );
  }