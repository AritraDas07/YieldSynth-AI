import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Zap, TrendingUp, Target, Activity } from 'lucide-react';

interface YieldOptimizationProps {
  timeframe: string;
}

const YieldOptimization: React.FC<YieldOptimizationProps> = ({ timeframe }) => {
  const optimizationData = [
    { strategy: 'Current', apy: 8.4, risk: 6.5, efficiency: 75 },
    { strategy: 'AI Optimized', apy: 10.2, risk: 6.8, efficiency: 92 },
    { strategy: 'Conservative', apy: 5.8, risk: 3.2, efficiency: 68 },
    { strategy: 'Aggressive', apy: 14.6, risk: 8.9, efficiency: 85 }
  ];

  const yieldTrend = [
    { month: 'Jan', current: 7.2, optimized: 8.8, potential: 9.5 },
    { month: 'Feb', current: 7.8, optimized: 9.2, potential: 10.1 },
    { month: 'Mar', current: 8.1, optimized: 9.8, potential: 10.6 },
    { month: 'Apr', current: 7.9, optimized: 9.5, potential: 10.3 },
    { month: 'May', current: 8.6, optimized: 10.4, potential: 11.2 },
    { month: 'Jun', current: 8.4, optimized: 10.2, potential: 10.9 }
  ];

  const optimizationOpportunities = [
    {
      title: 'Protocol Rebalancing',
      currentAPY: '8.4%',
      optimizedAPY: '10.2%',
      improvement: '+1.8%',
      effort: 'Low',
      timeframe: '1 day'
    },
    {
      title: 'Asset Allocation',
      currentAPY: '8.4%',
      optimizedAPY: '9.6%',
      improvement: '+1.2%',
      effort: 'Medium',
      timeframe: '3 days'
    },
    {
      title: 'Yield Farming Migration',
      currentAPY: '8.4%',
      optimizedAPY: '11.8%',
      improvement: '+3.4%',
      effort: 'High',
      timeframe: '1 week'
    },
    {
      title: 'Cross-Chain Opportunities',
      currentAPY: '8.4%',
      optimizedAPY: '12.9%',
      improvement: '+4.5%',
      effort: 'High',
      timeframe: '2 weeks'
    }
  ];

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Optimization Overview */}
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
              +1.8%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">10.2%</h3>
          <p className="text-gray-400 text-sm">Optimized APY</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              92%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">$1,847</h3>
          <p className="text-gray-400 text-sm">Additional Yield/Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00f5a0] to-[#00d4aa] rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              Low Risk
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">6.8/10</h3>
          <p className="text-gray-400 text-sm">Risk Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffb74d] to-[#ff9800] rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
              High
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">92%</h3>
          <p className="text-gray-400 text-sm">Efficiency Score</p>
        </motion.div>
      </div>

      {/* Strategy Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Strategy Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={optimizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="strategy" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
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
                yAxisId="left"
                dataKey="apy" 
                fill="#667eea"
                radius={[4, 4, 0, 0]}
                name="APY (%)"
              />
              <Bar 
                yAxisId="right"
                dataKey="efficiency" 
                fill="#f093fb"
                radius={[4, 4, 0, 0]}
                name="Efficiency (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Yield Trend Projection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Yield Optimization Trend</h2>
            <p className="text-sm text-gray-400">Current vs Optimized vs Potential ({timeframe})</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#667eea] rounded-full" />
              <span className="text-sm text-gray-400">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f093fb] rounded-full" />
              <span className="text-sm text-gray-400">AI Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00f5a0] rounded-full" />
              <span className="text-sm text-gray-400">Max Potential</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yieldTrend}>
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
                dataKey="current"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                name="Current APY"
              />
              <Line
                type="monotone"
                dataKey="optimized"
                stroke="#f093fb"
                strokeWidth={2}
                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                name="AI Optimized APY"
              />
              <Line
                type="monotone"
                dataKey="potential"
                stroke="#00f5a0"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#00f5a0', strokeWidth: 2, r: 4 }}
                name="Max Potential APY"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Optimization Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Optimization Opportunities</h2>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
            Execute All
          </button>
        </div>

        <div className="space-y-4">
          {optimizationOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                      {opportunity.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Current: {opportunity.currentAPY}</span>
                      <span>→</span>
                      <span>Optimized: {opportunity.optimizedAPY}</span>
                      <span>•</span>
                      <span>Timeline: {opportunity.timeframe}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">{opportunity.improvement}</div>
                    <div className="text-xs text-gray-400">Improvement</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getEffortColor(opportunity.effort)}`}>
                    {opportunity.effort} Effort
                  </div>
                  <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <TrendingUp className="w-4 h-4 text-gray-400 hover:text-[#667eea]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">AI Optimization Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Wins</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Migrate to Curve 3Pool</p>
                  <p className="text-xs text-gray-400">+0.8% APY with minimal risk increase</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Compound COMP rewards</p>
                  <p className="text-xs text-gray-400">Auto-compound for +0.3% effective APY</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white">Advanced Strategies</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Cross-chain arbitrage</p>
                  <p className="text-xs text-gray-400">Polygon opportunities: +2.1% potential</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Leverage farming</p>
                  <p className="text-xs text-gray-400">Careful leverage: +3.4% with managed risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default YieldOptimization;