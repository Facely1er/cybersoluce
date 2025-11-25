import React, { useRef, useEffect } from 'react';
import { BarChart2, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardDemo: React.FC = () => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const maturityData = {
    labels: ['Ransomware', 'Supply Chain', 'Privacy', 'Sensitive Info'],
    datasets: [
      {
        label: 'Current Maturity',
        data: [3.5, 2.8, 4.2, 3.1],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Target Maturity',
        data: [4.5, 4.0, 4.5, 4.0],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: 'rgb(107, 114, 128)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(107, 114, 128)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Security Posture Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Overall Maturity',
              value: '3.5',
              change: '+0.3',
              icon: BarChart2,
              color: 'text-blue-600 dark:text-blue-400',
              bgColor: 'bg-blue-100 dark:bg-blue-900/50',
            },
            {
              title: 'Critical Findings',
              value: '3',
              change: '-2',
              icon: AlertTriangle,
              color: 'text-red-600 dark:text-red-400',
              bgColor: 'bg-red-100 dark:bg-red-900/50',
            },
            {
              title: 'Controls Implemented',
              value: '85%',
              change: '+5%',
              icon: Shield,
              color: 'text-green-600 dark:text-green-400',
              bgColor: 'bg-green-100 dark:bg-green-900/50',
            },
            {
              title: 'Compliance Rate',
              value: '92%',
              change: '+2%',
              icon: TrendingUp,
              color: 'text-purple-600 dark:text-purple-400',
              bgColor: 'bg-purple-100 dark:bg-purple-900/50',
            },
          ].map((stat) => (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Maturity Level by Domain
          </h3>
          <div className="h-80">
            <Bar ref={chartRef} data={maturityData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;