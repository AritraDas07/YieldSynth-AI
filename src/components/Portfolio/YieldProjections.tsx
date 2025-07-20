import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Calculator, Target, Zap, DollarSign, Calendar } from 'lucide-react';

interface YieldProjectionsProps {
  timeframe: string;
}

const YieldProjections: React.FC<YieldProjectionsProps> = ({ timeframe }) => {
  const [projectionPeriod, setProjectionPeriod] = useState('1Y');
  const [compoundingFrequency, setCompoundingFrequency] = useState('daily');

  const projectionData = [
    { month: 'Jul 2024', conservative: 78500, balanced: 79200, aggressive: 80100 },
    { month: 'Aug 2024', conservative: 79800, balanced: 81500, aggressive: 83400 },
    { month: 'Sep 2024', conservative: 81100, balanced: 83900, aggressive: 86900 },
    { month: 'Oct 2024', conservative: 82500, balanced: 86400, aggressive: 90600 },
    { month: 'Nov 2024', conservative: 83900, balanced: 89000, aggressive: 94500 },
    { month: 'Dec 2024', conservative: 85400, balanced: 91700, aggressive: 98700 }
  ];

  const yieldBreakdown = [
    { source: 'Lending Protocols', amount: 1250, percentage: 35 },
    { source: 'Liquidity Mining', amount: 1580, percentage: 44 },
    { source: 'Yield Farming', amount: 750, percentage: 21 }
  ];

  const scenarios = [
    {
      name: 'Conservative',
      apy: '4.5%',
      projected1Y: '$85,400',
      risk: 'Low',
      color: '#00f5a0'
    },
    {
      name: 'Balanced',
      apy: '8.4%',
      projected1Y: '$91,700',
      risk: 'Medium',
      color: '#667eea'
    },
    {
      name: 'Aggressive',
      apy: '12.8%',
      projected1Y: '$98,700',
      risk: 'High',
      color: '#f093fb'
    }
  ];

  const periods = ['6M', '1Y', '2Y', '5Y'];
  const frequencies = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="space-y-8">
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Yield Projections</h2>
          <p className="text-gray-400">AI-powered yield forecasting and scenario analysis</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Period:</span>
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setProjectionPeriod(period)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  projectionPeriod === period
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Compounding:</span>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value)}
              className="px-3 py-2 glass-card rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
            >
              {frequencies.map((freq) => (
                <option key={freq.id} value={freq.id} className="bg-[#1a1a2e]">
                  {freq.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${scenario.color}, ${scenario.color}80)` }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                scenario.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                scenario.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {scenario.risk} Risk
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{scenario.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Current APY:</span>
                <span className="text-white font-medium">{scenario.apy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">1Y Projection:</span>
                <span className="text-white font-bold">{scenario.projected1Y}</span>
              </div>
            </div>
            
            <div className="mt-4 w-full bg-white/10 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{ 
                  background: `linear-gradient(90deg, ${scenario.color}, ${scenario.color}80)`,
                  width: `${70 + index * 10}%`
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projection Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Portfolio Value Projections</h2>
            <p className="text-sm text-gray-400">Scenario-based forecasting ({projectionPeriod})</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00f5a0] rounded-full" />
              <span className="text-sm text-gray-400">Conservative</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#667eea] rounded-full" />
              <span className="text-sm text-gray-400">Balanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f093fb] rounded-full" />
              <span className="text-sm text-gray-400">Aggressive</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
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
                dataKey="conservative"
                stroke="#00f5a0"
                strokeWidth={2}
                dot={{ fill: '#00f5a0', strokeWidth: 2, r: 4 }}
                name="Conservative"
              />
              <Line
                type="monotone"
                dataKey="balanced"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                name="Balanced"
              />
              <Line
                type="monotone"
                dataKey="aggressive"
                stroke="#f093fb"
                strokeWidth={2}
                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                name="Aggressive"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Yield Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Yield Source Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  type="category"
                  dataKey="source"
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
                  dataKey="amount" 
                  fill="url(#yieldGradient)"
                  radius={[0, 4, 4, 0]}
                />
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Yield Calculator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Yield Calculator</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="10000"
                  className="w-full pl-10 pr-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Period
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 glass-card rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300">
                  <option value="6" className="bg-[#1a1a2e]">6 months</option>
                  <option value="12" className="bg-[#1a1a2e]">1 year</option>
                  <option value="24" className="bg-[#1a1a2e]">2 years</option>
                  <option value="60" className="bg-[#1a1a2e]">5 years</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Projected Yield:</span>
                <span className="text-green-400 font-bold">$840.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Value:</span>
                <span className="text-white font-bold">$10,840.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Effective APY:</span>
                <span className="text-blue-400 font-bold">8.4%</span>
              </div>
            </div>

            <button className="w-full btn-primary py-3 px-4 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Deploy Strategy</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default YieldProjections;