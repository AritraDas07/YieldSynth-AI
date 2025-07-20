import React, { useState } from 'react';
import { Bot, Plus, Filter, Search, TrendingUp, Shield, Target } from 'lucide-react';
import StrategyCard from '../../components/Strategies/StrategyCard';
import CreateStrategyModal from '../../components/Strategies/CreateStrategyModal';

const Strategies: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const strategyTemplates = [
    {
      id: '1',
      name: 'Conservative Yield',
      description: 'Low-risk stablecoin farming with consistent returns',
      apy: 4.5,
      riskLevel: 2,
      protocols: ['Aave', 'Compound'],
      tokens: ['USDC', 'DAI', 'USDT'],
      totalValue: '$2.8M',
      users: 1250,
      performance: '+3.2%',
      category: 'conservative'
    },
    {
      id: '2',
      name: 'Balanced Growth',
      description: 'Diversified portfolio with moderate risk exposure',
      apy: 7.8,
      riskLevel: 5,
      protocols: ['Uniswap V3', 'Curve', 'Balancer'],
      tokens: ['ETH', 'WBTC', 'DAI'],
      totalValue: '$1.9M',
      users: 850,
      performance: '+6.7%',
      category: 'balanced'
    },
    {
      id: '3',
      name: 'Aggressive Alpha',
      description: 'High-yield strategies with advanced DeFi protocols',
      apy: 12.4,
      riskLevel: 8,
      protocols: ['Yearn', 'Convex', 'Frax'],
      tokens: ['ETH', 'LINK', 'UNI', 'AAVE'],
      totalValue: '$980K',
      users: 420,
      performance: '+9.8%',
      category: 'aggressive'
    },
    {
      id: '4',
      name: 'DeFi Blue Chip',
      description: 'Focus on established protocols with proven track records',
      apy: 6.2,
      riskLevel: 3,
      protocols: ['Aave', 'Compound', 'MakerDAO'],
      tokens: ['ETH', 'DAI', 'USDC'],
      totalValue: '$3.2M',
      users: 1850,
      performance: '+4.8%',
      category: 'conservative'
    },
    {
      id: '5',
      name: 'Liquidity Mining Pro',
      description: 'Advanced liquidity provision strategies',
      apy: 15.7,
      riskLevel: 9,
      protocols: ['Uniswap V3', 'SushiSwap', 'Bancor'],
      tokens: ['ETH', 'WBTC', 'LINK', 'UNI'],
      totalValue: '$720K',
      users: 280,
      performance: '+12.1%',
      category: 'aggressive'
    },
    {
      id: '6',
      name: 'Stable Plus',
      description: 'Enhanced stablecoin strategies with yield optimization',
      apy: 5.9,
      riskLevel: 2,
      protocols: ['Curve', 'Yearn', 'Convex'],
      tokens: ['USDC', 'DAI', 'FRAX', 'LUSD'],
      totalValue: '$4.1M',
      users: 2100,
      performance: '+4.2%',
      category: 'conservative'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Strategies', count: strategyTemplates.length },
    { id: 'conservative', label: 'Conservative', count: strategyTemplates.filter(s => s.category === 'conservative').length },
    { id: 'balanced', label: 'Balanced', count: strategyTemplates.filter(s => s.category === 'balanced').length },
    { id: 'aggressive', label: 'Aggressive', count: strategyTemplates.filter(s => s.category === 'aggressive').length }
  ];

  const filteredStrategies = strategyTemplates.filter(strategy => {
    const matchesFilter = selectedFilter === 'all' || strategy.category === selectedFilter;
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="w-8 h-8 text-[#667eea]" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              AI Strategy Marketplace
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover and deploy proven yield farming strategies optimized by genetic algorithms
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Create Strategy Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Strategy</span>
          </button>
        </div>

        {/* Strategy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">127</h3>
            <p className="text-gray-400">Active Strategies</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00f5a0] to-[#00d4aa] rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">8.7%</h3>
            <p className="text-gray-400">Average APY</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">$12.8M</h3>
            <p className="text-gray-400">Total Value Locked</p>
          </div>
        </div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map((strategy, index) => (
            <StrategyCard 
              key={strategy.id} 
              strategy={strategy} 
              index={index}
            />
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No strategies found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <CreateStrategyModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Strategies;