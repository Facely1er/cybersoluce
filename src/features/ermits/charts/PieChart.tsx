import React, { useMemo, useRef, useEffect } from 'react';

interface PieChartProps {
  data?: number[];
  labels?: string[];
  colors?: string[];
  size?: number;
  showLegend?: boolean;
  [key: string]: any;
}

export const PieChart: React.FC<PieChartProps> = ({
  data = [],
  labels = [],
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'],
  size = 200,
  showLegend = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendColorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chartData = useMemo(() => {
    if (!data.length) return [];
    
    const total = data.reduce((sum, value) => sum + value, 0);
    if (total === 0) return [];

    let currentAngle = -90; // Start at top
    
    return data.map((value, index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle += angle;

      // Calculate path for pie slice
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      const radius = size / 2 - 10;
      const centerX = size / 2;
      const centerY = size / 2;

      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      return {
        value,
        percentage: Math.round(percentage * 10) / 10,
        label: labels[index] || `Item ${index + 1}`,
        color: colors[index % colors.length],
        pathData,
        startAngle,
        endAngle
      };
    });
  }, [data, labels, colors, size]);

  // Set dynamic styles via refs to avoid inline style prop warnings
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--chart-size', `${size}px`);
    }
    if (chartContainerRef.current) {
      chartContainerRef.current.style.width = `${size}px`;
      chartContainerRef.current.style.height = `${size}px`;
    }
  }, [size]);

  // Set legend colors via refs
  useEffect(() => {
    chartData.forEach((slice, index) => {
      const ref = legendColorRefs.current[index];
      if (ref) {
        ref.style.backgroundColor = slice.color;
      }
    });
  }, [chartData]);

  if (!data.length || data.every(v => v === 0)) {
    return (
      <div 
        ref={containerRef}
        className="pie-chart flex items-center justify-center" 
        {...props}
      >
        <div className="text-center text-gray-400 dark:text-gray-500">
          <div className="text-sm">No data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pie-chart" ref={containerRef} {...props}>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div 
          ref={chartContainerRef}
          className="relative"
        >
          <svg width={size} height={size} className="transform -rotate-90" aria-label="Pie chart visualization">
            {chartData.map((slice, index) => (
              <path
                key={index}
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-300 hover:opacity-80"
                aria-label={`${slice.label}: ${slice.value} (${slice.percentage}%)`}
              />
            ))}
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.reduce((sum, val) => sum + val, 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>

        {showLegend && chartData.length > 0 && (
          <div className="space-y-2 min-w-[200px]">
            {chartData.map((slice, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  ref={(el) => { legendColorRefs.current[index] = el; }}
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {slice.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {slice.value} ({slice.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
