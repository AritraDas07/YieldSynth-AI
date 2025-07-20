import React from 'react';
import { useData } from '../../contexts/DataContext';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const ProtocolOverview: React.FC = () => {
  const { protocols } = useData();

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 30) return 'text-green-400';
    if (riskScore <= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Protocol Overview</h2>
          <p className="text-sm text-gray-400">Available DeFi protocols</p>
        </div>
        <button className="text-sm text-[#667eea] hover:text-[#764ba2] transition-colors duration-300">
          View All Protocols →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.map((protocol, index) => (
          <div
            key={protocol.name}
            className="glass-card rounded-xl p-4 card-hover group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">{protocol.logo}</div>
              <div>
                <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                  {protocol.name}
                </h3>
                <p className="text-xs text-gray-400">DeFi Protocol</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">APY</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{protocol.apy}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">TVL</span>
                <span className="text-sm font-medium text-white">{protocol.tvl}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Risk Score</span>
                <div className="flex items-center space-x-2">
                  <Shield className={`w-4 h-4 ${getRiskColor(protocol.riskScore)}`} />
                  <span className={`text-sm font-medium ${getRiskColor(protocol.riskScore)}`}>
                    {protocol.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Risk Bar */}
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    protocol.riskScore <= 30
                      ? 'bg-gradient-to-r from-green-400 to-green-500'
                      : protocol.riskScore <= 60
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                      : 'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${protocol.riskScore}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Deploy Strategy</span>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolOverview;