import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export default function PieChart({ labels, datasets }: PieChartProps) {
  return <Pie data={{ labels, datasets }} />;
}
