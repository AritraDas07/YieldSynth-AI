import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { TrendingUp, TrendingDown, MoreHorizontal, Edit3, Trash2, Eye } from 'lucide-react';

const ActivePositions: React.FC = () => {
  const { vaults } = useData();
  const [selectedVault, setSelectedVault] = useState<string | null>(null);

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

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Active Positions</h2>
          <p className="text-sm text-gray-400">Your yield farming strategies</p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
          + New Strategy
        </button>
      </div>

      <div className="space-y-4">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {vault.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{vault.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(vault.riskLevel)}`}>
                      {getRiskLabel(vault.riskLevel)} Risk
                    </span>
                    <span className="text-xs text-gray-400">
                      {vault.protocols.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedVault(selectedVault === vault.id ? null : vault.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-400">Total Value</span>
                <p className="text-lg font-semibold text-white">{vault.totalValue}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">APY</span>
                <p className="text-lg font-semibold text-green-400">{vault.apy}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">24h Change</span>
                <div className="flex items-center space-x-1">
                  {vault.performance.daily >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    vault.performance.daily >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {vault.performance.daily >= 0 ? '+' : ''}{vault.performance.daily}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400">30d Performance</span>
                <span className="text-sm font-medium text-green-400">
                  +{vault.performance.monthly}%
                </span>
              </div>
            </div>

            {/* Token Allocation */}
            <div className="mb-4">
              <span className="text-xs text-gray-400 mb-2 block">Token Allocation</span>
              <div className="flex items-center space-x-2">
                {vault.tokens.map((token, index) => (
                  <div
                    key={token}
                    className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-white"
                  >
                    {token}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-4">
              <div
                className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(vault.apy * 8, 100)}%` }}
              />
            </div>

            {/* Action Menu */}
            {selectedVault === vault.id && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors duration-300 text-sm">
                    <Edit3 className="w-4 h-4" />
                    <span>Rebalance</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300 text-sm">
                    <Trash2 className="w-4 h-4" />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivePositions;