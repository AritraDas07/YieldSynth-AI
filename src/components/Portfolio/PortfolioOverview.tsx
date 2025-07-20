import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, Zap } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface PortfolioOverviewProps {
  timeframe: string;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ timeframe }) => {
  const { vaults } = useData();

  const portfolioStats = {
    totalValue: '$77,061.37',
    totalChange: '+12.5%',
    totalYield: '$2,847.32',
    yieldChange: '+8.2%',
    activePositions: vaults.length,
    avgAPY: '8.4%'
  };

  const topPerformers = [
    { name: 'Aggressive Alpha', value: '$32,890.12', change: '+15.8%', apy: '12.4%' },
    { name: 'Conservative Yield', value: '$25,420.80', change: '+4.2%', apy: '4.5%' },
    { name: 'Balanced Growth', value: '$18,750.45', change: '+7.8%', apy: '7.8%' }
  ];

  return (
    <div className="space-y-8">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              {portfolioStats.totalChange}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{portfolioStats.totalValue}</h3>
          <p className="text-gray-400 text-sm">Total Portfolio Value</p>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full w-[75%]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00f5a0] to-[#00d4aa] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              {portfolioStats.yieldChange}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{portfolioStats.totalYield}</h3>
          <p className="text-gray-400 text-sm">Total Yield Generated</p>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="h-2 bg-gradient-to-r from-[#00f5a0] to-[#00d4aa] rounded-full w-[82%]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              {portfolioStats.avgAPY}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{portfolioStats.activePositions}</h3>
          <p className="text-gray-400 text-sm">Active Positions</p>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="h-2 bg-gradient-to-r from-[#f093fb] to-[#f5576c] rounded-full w-[60%]" />
          </div>
        </motion.div>
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
            <h2 className="text-xl font-bold text-white">Portfolio Performance</h2>
            <p className="text-sm text-gray-400">Value over time ({timeframe})</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">+12.5%</div>
              <div className="text-xs text-gray-400">Total Return</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">1.24</div>
              <div className="text-xs text-gray-400">Sharpe Ratio</div>
            </div>
          </div>
        </div>

        {/* Simplified Chart */}
        <div className="relative h-64 bg-black/20 rounded-xl p-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#764ba2" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            <path
              d="M 0 80 L 20 75 L 40 70 L 60 65 L 80 60 L 100 55 L 100 100 L 0 100 Z"
              fill="url(#portfolioGradient)"
            />
            
            <path
              d="M 0 80 L 20 75 L 40 70 L 60 65 L 80 60 L 100 55"
              fill="none"
              stroke="#667eea"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Top Performing Strategies</h2>
          <button className="text-sm text-[#667eea] hover:text-[#764ba2] transition-colors duration-300">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {topPerformers.map((strategy, index) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {strategy.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                      {strategy.name}
                    </h3>
                    <p className="text-sm text-gray-400">APY: {strategy.apy}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">{strategy.value}</div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">{strategy.change}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioOverview;