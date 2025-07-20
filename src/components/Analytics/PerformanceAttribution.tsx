import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

interface PerformanceAttributionProps {
  timeframe: string;
}

const PerformanceAttribution: React.FC<PerformanceAttributionProps> = ({ timeframe }) => {
  const attributionData = [
    { source: 'Asset Selection', contribution: 3.2, color: '#667eea' },
    { source: 'Protocol Selection', contribution: 2.8, color: '#f093fb' },
    { source: 'Timing', contribution: 1.5, color: '#00f5a0' },
    { source: 'Rebalancing', contribution: 0.9, color: '#ffb74d' },
    { source: 'Fees & Costs', contribution: -0.4, color: '#ff5252' }
  ];

  const monthlyAttribution = [
    { month: 'Jan', assetSelection: 2.1, protocolSelection: 1.8, timing: 0.8, rebalancing: 0.5 },
    { month: 'Feb', assetSelection: 2.8, protocolSelection: 2.2, timing: 1.2, rebalancing: 0.7 },
    { month: 'Mar', assetSelection: 3.5, protocolSelection: 2.9, timing: 1.8, rebalancing: 1.1 },
    { month: 'Apr', assetSelection: 3.1, protocolSelection: 2.5, timing: 1.4, rebalancing: 0.8 },
    { month: 'May', assetSelection: 3.8, protocolSelection: 3.2, timing: 2.1, rebalancing: 1.3 },
    { month: 'Jun', assetSelection: 3.2, protocolSelection: 2.8, timing: 1.5, rebalancing: 0.9 }
  ];

  const strategyPerformance = [
    { name: 'Conservative Yield', return: 4.2, benchmark: 3.8, alpha: 0.4 },
    { name: 'Balanced Growth', return: 7.8, benchmark: 6.5, alpha: 1.3 },
    { name: 'Aggressive Alpha', return: 12.4, benchmark: 9.8, alpha: 2.6 }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${value > 0 ? '+' : ''}${value}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              +8.0%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">8.0%</h3>
          <p className="text-gray-400 text-sm">Total Attribution</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              +1.6%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">1.6%</h3>
          <p className="text-gray-400 text-sm">Alpha Generated</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00f5a0] to-[#00d4aa] rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              1.24
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">1.24</h3>
          <p className="text-gray-400 text-sm">Sharpe Ratio</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffb74d] to-[#ff9800] rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              Low
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">8.5%</h3>
          <p className="text-gray-400 text-sm">Max Drawdown</p>
        </motion.div>
      </div>

      {/* Attribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Performance Attribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="contribution"
                >
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Attribution Details</h2>
          <div className="space-y-4">
            {attributionData.map((item, index) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 glass-card rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white font-medium">{item.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.contribution > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`font-bold ${
                    item.contribution > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {item.contribution > 0 ? '+' : ''}{item.contribution}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Attribution Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Monthly Attribution Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyAttribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
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
              <Line
                type="monotone"
                dataKey="assetSelection"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                name="Asset Selection"
              />
              <Line
                type="monotone"
                dataKey="protocolSelection"
                stroke="#f093fb"
                strokeWidth={2}
                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                name="Protocol Selection"
              />
              <Line
                type="monotone"
                dataKey="timing"
                stroke="#00f5a0"
                strokeWidth={2}
                dot={{ fill: '#00f5a0', strokeWidth: 2, r: 4 }}
                name="Timing"
              />
              <Line
                type="monotone"
                dataKey="rebalancing"
                stroke="#ffb74d"
                strokeWidth={2}
                dot={{ fill: '#ffb74d', strokeWidth: 2, r: 4 }}
                name="Rebalancing"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Strategy Performance Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Strategy vs Benchmark Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={strategyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
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
              <Bar 
                dataKey="return" 
                fill="#667eea"
                radius={[4, 4, 0, 0]}
                name="Strategy Return (%)"
              />
              <Bar 
                dataKey="benchmark" 
                fill="#f093fb"
                radius={[4, 4, 0, 0]}
                name="Benchmark Return (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceAttribution;