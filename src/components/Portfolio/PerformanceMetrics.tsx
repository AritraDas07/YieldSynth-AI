import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, DollarSign, Zap } from 'lucide-react';

interface PerformanceMetricsProps {
  timeframe: string;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ timeframe }) => {
  const [selectedMetric, setSelectedMetric] = useState('portfolio');

  const performanceData = [
    { date: '2024-01', portfolio: 65000, benchmark: 62000, yield: 2800 },
    { date: '2024-02', portfolio: 67500, benchmark: 63200, yield: 3100 },
    { date: '2024-03', portfolio: 69800, benchmark: 64100, yield: 3400 },
    { date: '2024-04', portfolio: 72100, benchmark: 65500, yield: 3700 },
    { date: '2024-05', portfolio: 74800, benchmark: 66800, yield: 4000 },
    { date: '2024-06', portfolio: 77061, benchmark: 68200, yield: 4300 }
  ];

  const metrics = [
    {
      id: 'portfolio',
      label: 'Portfolio Value',
      value: '$77,061.37',
      change: '+12.5%',
      icon: DollarSign,
      color: '#667eea'
    },
    {
      id: 'benchmark',
      label: 'Benchmark',
      value: '$68,200.00',
      change: '+8.2%',
      icon: Target,
      color: '#f093fb'
    },
    {
      id: 'yield',
      label: 'Yield Generated',
      value: '$4,300.00',
      change: '+15.8%',
      icon: TrendingUp,
      color: '#00f5a0'
    }
  ];

  const riskMetrics = [
    { label: 'Sharpe Ratio', value: '1.24', description: 'Risk-adjusted returns' },
    { label: 'Max Drawdown', value: '8.5%', description: 'Largest peak-to-trough decline' },
    { label: 'Volatility', value: '12.3%', description: 'Standard deviation of returns' },
    { label: 'Beta', value: '0.85', description: 'Correlation with market' },
    { label: 'Alpha', value: '4.2%', description: 'Excess return vs benchmark' },
    { label: 'VaR (95%)', value: '5.8%', description: 'Value at Risk' }
  ];

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-2xl p-6 card-hover cursor-pointer transition-all duration-300 ${
              selectedMetric === metric.id ? 'ring-2 ring-[#667eea]' : ''
            }`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${metric.color}, ${metric.color}80)` }}
              >
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                metric.change.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-gray-400 text-sm">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Performance Comparison</h2>
            <p className="text-sm text-gray-400">Portfolio vs Benchmark ({timeframe})</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#667eea] rounded-full" />
              <span className="text-sm text-gray-400">Portfolio</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f093fb] rounded-full" />
              <span className="text-sm text-gray-400">Benchmark</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f093fb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f093fb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }}
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                stroke="#667eea"
                fillOpacity={1}
                fill="url(#portfolioGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#f093fb"
                fillOpacity={1}
                fill="url(#benchmarkGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Risk Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Risk Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-sm font-medium text-gray-300 mb-2">{metric.label}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Monthly Performance Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
            const returns = [2.1, 3.8, 3.4, 3.3, 3.7, 2.9];
            const isPositive = returns[index] > 0;
            
            return (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass-card rounded-xl p-4 text-center hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-2">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isPositive ? '+' : ''}{returns[index]}%
                </h3>
                <p className="text-xs text-gray-400">{month} 2024</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceMetrics;