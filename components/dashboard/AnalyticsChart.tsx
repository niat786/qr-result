'use client';

import { useState } from 'react';

export default function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('scans');

  const mockData = {
    scans: {
      '7d': [45, 52, 38, 67, 89, 73, 94],
      '30d': [120, 145, 167, 189, 234, 256, 278, 301, 287, 345],
      '90d': [890, 945, 1023, 1156, 1234, 1345, 1456, 1567, 1678, 1789]
    },
    qrcodes: {
      '7d': [2, 3, 1, 4, 2, 5, 3],
      '30d': [8, 12, 15, 18, 22, 19, 25, 28, 31, 35],
      '90d': [45, 52, 58, 63, 71, 78, 85, 92, 98, 105]
    }
  };

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const chartTypes = [
    { value: 'scans', label: 'Scans', icon: 'ri-eye-line' },
    { value: 'qrcodes', label: 'QR Codes Created', icon: 'ri-qr-code-line' }
  ];

  const currentData = mockData[chartType as keyof typeof mockData][timeRange as keyof typeof mockData.scans];
  const maxValue = Math.max(...currentData);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">Analytics Overview</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          >
            {chartTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="h-64 flex items-end justify-between space-x-2">
        {currentData.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
              style={{
                height: `${(value / maxValue) * 200}px`,
                minHeight: '4px'
              }}
              title={`${value} ${chartType === 'scans' ? 'scans' : 'QR codes'}`}
            />
            <div className="text-xs text-gray-500 mt-2">
              {timeRange === '7d' && `Day ${index + 1}`}
              {timeRange === '30d' && `Week ${index + 1}`}
              {timeRange === '90d' && `Month ${index + 1}`}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Legend */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded mr-2"></div>
          <span>{chartTypes.find(t => t.value === chartType)?.label}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Total: {currentData.reduce((a, b) => a + b, 0).toLocaleString()}</span>
          <span>Avg: {Math.round(currentData.reduce((a, b) => a + b, 0) / currentData.length)}</span>
        </div>
      </div>
    </div>
  );
}