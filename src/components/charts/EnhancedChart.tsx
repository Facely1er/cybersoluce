import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { BarChart3, TrendingUp, PieChart, Target } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface EnhancedChartProps {
  type: 'bar' | 'line' | 'doughnut' | 'radar';
  data: any;
  options?: any;
  title?: string;
  subtitle?: string;
  height?: number;
  loading?: boolean;
  className?: string;
}

const EnhancedChart: React.FC<EnhancedChartProps> = ({
  type,
  data,
  options = {},
  title,
  subtitle,
  height = 300,
  loading = false,
  className = ''
}) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const getChartIcon = () => {
    switch (type) {
      case 'bar': return BarChart3;
      case 'line': return TrendingUp;
      case 'doughnut': return PieChart;
      case 'radar': return Target;
      default: return BarChart3;
    }
  };

  const Icon = getChartIcon();

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: 'Inter, system-ui, sans-serif'
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    scales: type === 'doughnut' || type === 'radar' ? undefined : {
      x: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif'
          }
        }
      }
    },
    ...options
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar ref={chartRef} data={data} options={defaultOptions} />;
      case 'line':
        return <Line ref={chartRef} data={data} options={defaultOptions} />;
      case 'doughnut':
        return <Doughnut ref={chartRef} data={data} options={defaultOptions} />;
      case 'radar':
        return <Radar ref={chartRef} data={data} options={defaultOptions} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <div className="flex items-center">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                </div>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : (
          <div style={{ height }}>
            {renderChart()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedChart;