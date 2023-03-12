import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Default title',
    },
  },
};

interface HorizontalBarChartProps {
  chartTitle: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export default function HorizontalBarChart({
  data,
  chartTitle,
}: HorizontalBarChartProps) {
  return (
    <Bar
      options={{
        ...options,
        plugins: {
          ...options.plugins,
          title: { ...options.plugins.title, text: chartTitle },
        },
      }}
      data={data}
    />
  );
}
