import React, { useState } from 'react';
import { TrendingUp, Shield, Users, DollarSign, Play, Eye, Star } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  apy: number;
  riskLevel: number;
  protocols: string[];
  tokens: string[];
  totalValue: string;
  users: number;
  performance: string;
  category: string;
}

interface StrategyCardProps {
  strategy: Strategy;
  index: number;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, index }) => {
  const [isDeploying, setIsDeploying] = useState(false);

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel <= 3) return 'text-green-400 bg-green-400/20';
    if (riskLevel <= 7) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getRiskLabel = (riskLevel: number) => {
    if (riskLevel <= 3) return 'Low';
    if (riskLevel <= 7) return 'Medium';
    return 'High';
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsDeploying(false);
    
    if (window.showToast) {
      window.showToast(`${strategy.name} strategy deployed successfully!`, 'success');
    }
  };

  return (
    <div 
      className="glass-card rounded-2xl p-6 card-hover group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {strategy.name.split(' ').map(word => word[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
              {strategy.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                {getRiskLabel(strategy.riskLevel)} Risk
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-gray-400">4.8</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {strategy.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">APY</span>
          </div>
          <span className="text-lg font-semibold text-green-400">{strategy.apy}%</span>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">TVL</span>
          </div>
          <span className="text-lg font-semibold text-white">{strategy.totalValue}</span>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Users</span>
          </div>
          <span className="text-lg font-semibold text-white">{strategy.users.toLocaleString()}</span>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <Shield className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-400">30d</span>
          </div>
          <span className="text-lg font-semibold text-green-400">{strategy.performance}</span>
        </div>
      </div>

      {/* Protocols */}
      <div className="mb-4">
        <span className="text-xs text-gray-400 mb-2 block">Protocols</span>
        <div className="flex flex-wrap gap-1">
          {strategy.protocols.map((protocol) => (
            <span
              key={protocol}
              className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-white"
            >
              {protocol}
            </span>
          ))}
        </div>
      </div>

      {/* Tokens */}
      <div className="mb-6">
        <span className="text-xs text-gray-400 mb-2 block">Assets</span>
        <div className="flex flex-wrap gap-1">
          {strategy.tokens.map((token) => (
            <span
              key={token}
              className="px-2 py-1 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 rounded-lg text-xs font-medium text-[#667eea]"
            >
              {token}
            </span>
          ))}
        </div>
      </div>

      {/* Performance Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(strategy.apy * 6, 100)}%` }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="flex-1 btn-primary py-3 px-4 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center space-x-2">
            {isDeploying ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isDeploying ? 'Deploying...' : 'Deploy Strategy'}</span>
          </div>
        </button>
        
        <button className="p-3 glass-card rounded-xl hover:bg-white/10 transition-colors duration-300">
          <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default StrategyCard;