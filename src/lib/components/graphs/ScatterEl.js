import React from 'react';

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Scatter } from 'react-chartjs-2';

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


  export const ScatterEl = (props) => {
    const { options, data } = props;
    return (
        <Scatter options={options} data={data} />
    );
  }