import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Default chart title',
    },
  },
};

interface AreaChartProps {
  chartTitle: string;
  labels: string[];
  datasets: {
    fill: boolean;
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export default function AreaChart({
  labels,
  datasets,
  chartTitle,
}: AreaChartProps) {
  return (
    <Line
      options={{
        ...options,
        plugins: {
          ...options.plugins,
          title: { ...options.plugins.title, text: chartTitle },
        },
      }}
      data={{ labels, datasets }}
    />
  );
}
