import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useWallet } from '../../contexts/WalletContext';
import StatsCards from '../../components/Dashboard/StatsCards';
import AIRecommendations from '../../components/Dashboard/AIRecommendations';
import PerformanceChart from '../../components/Dashboard/PerformanceChart';
import ActivePositions from '../../components/Dashboard/ActivePositions';
import ProtocolOverview from '../../components/Dashboard/ProtocolOverview';
import QuickActions from '../../components/Dashboard/QuickActions';
import { TrendingUp, Bot, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isLoading } = useData();
  const { wallet } = useWallet();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h2>
          <p className="text-gray-400">Initializing AI optimization engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="w-8 h-8 text-[#667eea]" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              YieldSynth AI Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Intelligent yield farming powered by genetic algorithms and reinforcement learning. 
            Maximize your DeFi returns with institutional-grade AI optimization.
          </p>
          
          {!wallet.isConnected && (
            <div className="mt-8 glass-card rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">Get Started</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Connect your wallet to access AI-powered yield optimization
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>+127% average APY improvement</span>
              </div>
            </div>
          )}
        </div>

        {wallet.isConnected ? (
          <div className="space-y-8">
            {/* Stats Overview */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <PerformanceChart />
                <ActivePositions />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <AIRecommendations />
                <QuickActions />
              </div>
            </div>

            {/* Protocol Overview */}
            <ProtocolOverview />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards for Non-Connected Users */}
            <div className="glass-card rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Optimization</h3>
              <p className="text-gray-400 mb-4">
                Advanced genetic algorithms optimize your yield farming strategies in real-time
              </p>
              <div className="text-sm text-[#667eea] font-medium">
                Learn More →
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-gray-400 mb-4">
                Sophisticated risk assessment with VaR calculations and stress testing
              </p>
              <div className="text-sm text-[#f093fb] font-medium">
                Learn More →
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00f5a0] to-[#00d4aa] rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Protocol</h3>
              <p className="text-gray-400 mb-4">
                Seamless integration across 15+ major DeFi protocols for maximum yield
              </p>
              <div className="text-sm text-[#00f5a0] font-medium">
                Learn More →
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;