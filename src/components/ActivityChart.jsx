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
import { format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function ActivityChart({ history }) {
  // Generate last 7 days labels
  const labels = Array.from({ length: 7 }).map((_, i) => {
    return format(subDays(new Date(), 6 - i), 'MMM dd');
  });

  // Calculate activity for the last 7 days
  const dataPoints = labels.map((label) => {
    // Basic check: if the formatted date exists in history
    return history.some((entry) => format(new Date(entry.date), 'MMM dd') === label) ? 1 : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Build Activity',
        data: dataPoints,
        borderColor: 'rgba(59, 130, 246, 1)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw === 1 ? 'Built something!' : 'No activity';
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1.5,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value === 1 ? 'Yes' : value === 0 ? 'No' : '';
          },
          color: 'rgba(255, 255, 255, 0.5)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[250px] w-full">
      <Line options={options} data={data} />
    </div>
  );
}
