import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Activity,
  PieChart,
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useWallet } from '../../contexts/WalletContext';
import PortfolioOverview from '../../components/Portfolio/PortfolioOverview';
import AssetAllocation from '../../components/Portfolio/AssetAllocation';
import PerformanceMetrics from '../../components/Portfolio/PerformanceMetrics';
import TransactionHistory from '../../components/Portfolio/TransactionHistory';
import RiskAnalysis from '../../components/Portfolio/RiskAnalysis';
import YieldProjections from '../../components/Portfolio/YieldProjections';

const Portfolio: React.FC = () => {
  const { vaults, isLoading } = useData();
  const { wallet } = useWallet();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

  const timeframes = ['24H', '7D', '30D', '90D', '1Y', 'ALL'];
  const views = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'allocation', label: 'Allocation', icon: PieChart },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'risk', label: 'Risk Analysis', icon: Target },
    { id: 'projections', label: 'Projections', icon: BarChart3 }
  ];

  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <Briefcase className="w-8 h-8 text-[#667eea]" />
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Portfolio Management
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Connect your wallet to access advanced portfolio analytics and management tools
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Wallet to Continue</h3>
              <p className="text-gray-400 mb-6">
                Access your portfolio analytics, performance metrics, and advanced management tools
              </p>
              <button className="btn-primary px-8 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300">
                Connect Wallet
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Loading Portfolio</h2>
              <p className="text-gray-400">Analyzing your positions and performance...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Briefcase className="w-8 h-8 text-[#667eea]" />
              <h1 className="text-4xl font-bold gradient-text">Portfolio Management</h1>
            </div>
            <p className="text-gray-400">Advanced analytics and portfolio optimization tools</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
                <RefreshCw className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
                <Download className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
                <Filter className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-1 mb-8 overflow-x-auto"
        >
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedView === view.id
                  ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <view.icon className="w-4 h-4" />
              <span>{view.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={selectedView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedView === 'overview' && <PortfolioOverview timeframe={selectedTimeframe} />}
          {selectedView === 'allocation' && <AssetAllocation timeframe={selectedTimeframe} />}
          {selectedView === 'performance' && <PerformanceMetrics timeframe={selectedTimeframe} />}
          {selectedView === 'transactions' && <TransactionHistory timeframe={selectedTimeframe} />}
          {selectedView === 'risk' && <RiskAnalysis timeframe={selectedTimeframe} />}
          {selectedView === 'projections' && <YieldProjections timeframe={selectedTimeframe} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;