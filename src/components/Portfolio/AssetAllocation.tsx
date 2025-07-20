import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface AssetAllocationProps {
  timeframe: string;
}

const AssetAllocation: React.FC<AssetAllocationProps> = ({ timeframe }) => {
  const allocationData = [
    { name: 'ETH', value: 35, amount: '$26,971.48', color: '#667eea' },
    { name: 'WBTC', value: 25, amount: '$19,265.34', color: '#f093fb' },
    { name: 'USDC', value: 20, amount: '$15,412.27', color: '#00f5a0' },
    { name: 'DAI', value: 12, amount: '$9,247.36', color: '#ffb74d' },
    { name: 'LINK', value: 8, amount: '$6,164.92', color: '#ff5252' }
  ];

  const protocolData = [
    { name: 'Aave', allocation: 35, yield: 4.2, risk: 'Low' },
    { name: 'Compound', allocation: 25, yield: 3.8, risk: 'Low' },
    { name: 'Uniswap V3', allocation: 20, yield: 8.5, risk: 'Medium' },
    { name: 'Curve', allocation: 12, yield: 6.3, risk: 'Low' },
    { name: 'Balancer', allocation: 8, yield: 7.8, risk: 'Medium' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
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
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Asset Allocation Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Asset Allocation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
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

        {/* Asset Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Asset Breakdown</h2>
          <div className="space-y-4">
            {allocationData.map((asset, index) => (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{asset.name}</h3>
                    <p className="text-sm text-gray-400">{asset.value}% allocation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{asset.amount}</div>
                  <div className="text-sm text-gray-400">{asset.value}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Protocol Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Protocol Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={protocolData}>
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
                dataKey="allocation" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Rebalancing Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">AI Rebalancing Recommendations</h2>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
            Execute Rebalance
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Suggested Changes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Increase USDC allocation</span>
                <span className="text-green-400 font-medium">+5%</span>
              </div>
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Reduce ETH exposure</span>
                <span className="text-red-400 font-medium">-3%</span>
              </div>
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Add LINK position</span>
                <span className="text-blue-400 font-medium">+2%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white">Expected Impact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Projected APY</span>
                <span className="text-green-400 font-medium">9.2% (+0.8%)</span>
              </div>
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Risk Score</span>
                <span className="text-yellow-400 font-medium">6.5/10 (-0.5)</span>
              </div>
              <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                <span className="text-gray-300">Sharpe Ratio</span>
                <span className="text-blue-400 font-medium">1.34 (+0.10)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssetAllocation;