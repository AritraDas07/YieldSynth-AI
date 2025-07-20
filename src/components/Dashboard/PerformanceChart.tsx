import React, { useState } from 'react';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7D');
  const [chartType, setChartType] = useState('yield');

  const timeframes = ['24H', '7D', '30D', '90D', '1Y'];
  const chartTypes = [
    { id: 'yield', label: 'Yield Performance', icon: TrendingUp },
    { id: 'allocation', label: 'Asset Allocation', icon: BarChart3 }
  ];

  // Mock chart data
  const generateChartData = () => {
    const points = 30;
    const data = [];
    let value = 1000;
    
    for (let i = 0; i < points; i++) {
      value += (Math.random() - 0.45) * 50; // Slight upward trend
      data.push({
        x: i,
        y: Math.max(value, 100),
        date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData.map(d => d.y));
  const minValue = Math.min(...chartData.map(d => d.y));

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Performance Analytics</h2>
            <p className="text-sm text-gray-400">Real-time yield tracking</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                chartType === type.id
                  ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <type.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-1 mb-6">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              timeframe === tf
                ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="relative h-64 bg-black/20 rounded-xl p-4 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-4 right-4 border-t border-white/5"
              style={{ top: `${20 + i * 20}%` }}
            />
          ))}
        </div>

        {/* Chart SVG */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`M 0 100 ${chartData.map((point, i) => 
              `L ${(i / (chartData.length - 1)) * 100} ${100 - ((point.y - minValue) / (maxValue - minValue)) * 80}`
            ).join(' ')} L 100 100 Z`}
            fill="url(#chartGradient)"
          />
          
          {/* Line */}
          <path
            d={`M ${chartData.map((point, i) => 
              `${(i / (chartData.length - 1)) * 100} ${100 - ((point.y - minValue) / (maxValue - minValue)) * 80}`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="0.5"
          />
          
          {/* Data points */}
          {chartData.map((point, i) => (
            <circle
              key={i}
              cx={(i / (chartData.length - 1)) * 100}
              cy={100 - ((point.y - minValue) / (maxValue - minValue)) * 80}
              r="0.3"
              fill="#667eea"
              className="opacity-60"
            />
          ))}
        </svg>

        {/* Hover overlay */}
        <div className="absolute inset-0 p-4">
          <div className="w-full h-full flex items-end justify-end">
            <div className="glass-card rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Current Value</div>
              <div className="text-lg font-bold text-white">
                ${chartData[chartData.length - 1]?.y.toFixed(2)}
              </div>
              <div className="text-xs text-green-400">+5.2% (7D)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-lg font-bold text-white">8.4%</div>
          <div className="text-xs text-gray-400">Average APY</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">+12.5%</div>
          <div className="text-xs text-gray-400">Total Return</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">0.85</div>
          <div className="text-xs text-gray-400">Sharpe Ratio</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;