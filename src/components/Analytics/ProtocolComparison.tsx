import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Shield, Zap, Activity, Star, Target } from 'lucide-react';

interface ProtocolComparisonProps {
  timeframe: string;
}

const ProtocolComparison: React.FC<ProtocolComparisonProps> = ({ timeframe }) => {
  const [selectedProtocols, setSelectedProtocols] = useState(['aave', 'compound', 'uniswap']);

  const protocols = [
    {
      id: 'aave',
      name: 'Aave',
      logo: '🅰️',
      apy: 4.2,
      tvl: '$12.8B',
      riskScore: 20,
      gasEfficiency: 85,
      liquidity: 95,
      security: 98,
      innovation: 88,
      community: 92
    },
    {
      id: 'compound',
      name: 'Compound',
      logo: '🔄',
      apy: 3.8,
      tvl: '$8.5B',
      riskScore: 25,
      gasEfficiency: 78,
      liquidity: 90,
      security: 95,
      innovation: 75,
      community: 85
    },
    {
      id: 'uniswap',
      name: 'Uniswap V3',
      logo: '🦄',
      apy: 8.5,
      tvl: '$5.2B',
      riskScore: 45,
      gasEfficiency: 70,
      liquidity: 88,
      security: 90,
      innovation: 95,
      community: 98
    },
    {
      id: 'curve',
      name: 'Curve',
      logo: '⚡',
      apy: 6.3,
      tvl: '$4.1B',
      riskScore: 30,
      gasEfficiency: 82,
      liquidity: 92,
      security: 93,
      innovation: 80,
      community: 88
    },
    {
      id: 'balancer',
      name: 'Balancer',
      logo: '⚖️',
      apy: 7.8,
      tvl: '$2.9B',
      riskScore: 40,
      gasEfficiency: 75,
      liquidity: 85,
      security: 88,
      innovation: 90,
      community: 82
    },
    {
      id: 'yearn',
      name: 'Yearn',
      logo: '💰',
      apy: 9.2,
      tvl: '$1.8B',
      riskScore: 35,
      gasEfficiency: 80,
      liquidity: 78,
      security: 85,
      innovation: 92,
      community: 90
    }
  ];

  const getRadarData = (protocolId: string) => {
    const protocol = protocols.find(p => p.id === protocolId);
    if (!protocol) return [];

    return [
      { subject: 'APY', A: protocol.apy * 10, fullMark: 100 },
      { subject: 'Security', A: protocol.security, fullMark: 100 },
      { subject: 'Liquidity', A: protocol.liquidity, fullMark: 100 },
      { subject: 'Gas Efficiency', A: protocol.gasEfficiency, fullMark: 100 },
      { subject: 'Innovation', A: protocol.innovation, fullMark: 100 },
      { subject: 'Community', A: protocol.community, fullMark: 100 }
    ];
  };

  const comparisonData = protocols.map(protocol => ({
    name: protocol.name,
    apy: protocol.apy,
    tvl: parseFloat(protocol.tvl.replace('$', '').replace('B', '')),
    riskScore: protocol.riskScore,
    overall: (protocol.security + protocol.liquidity + protocol.gasEfficiency + protocol.innovation + protocol.community) / 5
  }));

  const toggleProtocol = (protocolId: string) => {
    setSelectedProtocols(prev => 
      prev.includes(protocolId) 
        ? prev.filter(id => id !== protocolId)
        : [...prev, protocolId].slice(0, 3) // Max 3 protocols
    );
  };

  const getProtocolColor = (index: number) => {
    const colors = ['#667eea', '#f093fb', '#00f5a0', '#ffb74d', '#ff5252', '#764ba2'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-8">
      {/* Protocol Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Select Protocols to Compare (Max 3)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {protocols.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => toggleProtocol(protocol.id)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedProtocols.includes(protocol.id)
                  ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                  : 'glass-card hover:bg-white/5'
              }`}
            >
              <div className="text-2xl mb-2">{protocol.logo}</div>
              <div className="font-medium text-sm">{protocol.name}</div>
              <div className="text-xs text-gray-400">{protocol.apy}% APY</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Comparison Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {selectedProtocols.map((protocolId, index) => {
          const protocol = protocols.find(p => p.id === protocolId);
          if (!protocol) return null;

          return (
            <div key={protocolId} className="glass-card rounded-2xl p-6 card-hover">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">{protocol.logo}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{protocol.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">Top Protocol</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">APY</span>
                  <span className="text-green-400 font-bold">{protocol.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TVL</span>
                  <span className="text-white font-medium">{protocol.tvl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Score</span>
                  <span className={`font-medium ${
                    protocol.riskScore <= 30 ? 'text-green-400' :
                    protocol.riskScore <= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {protocol.riskScore}/100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security</span>
                  <span className="text-blue-400 font-medium">{protocol.security}/100</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="w-full btn-primary py-2 px-4 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
                  Deploy Strategy
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Radar Chart Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Protocol Performance Radar</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              {selectedProtocols.map((protocolId, index) => {
                const protocol = protocols.find(p => p.id === protocolId);
                const data = getRadarData(protocolId);
                const color = getProtocolColor(index);
                
                return (
                  <Radar
                    key={protocolId}
                    name={protocol?.name}
                    dataKey="A"
                    stroke={color}
                    fill={color}
                    fillOpacity={0.1}
                    strokeWidth={2}
                    data={data}
                  />
                );
              })}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Detailed Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">APY vs Risk Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
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
                dataKey="riskScore" 
                fill="#f093fb"
                radius={[4, 4, 0, 0]}
                name="Risk Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Protocol Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Protocol Rankings</h2>
        <div className="space-y-4">
          {protocols
            .sort((a, b) => {
              const scoreA = (a.security + a.liquidity + a.gasEfficiency + a.innovation + a.community) / 5;
              const scoreB = (b.security + b.liquidity + b.gasEfficiency + b.innovation + b.community) / 5;
              return scoreB - scoreA;
            })
            .map((protocol, index) => {
              const overallScore = (protocol.security + protocol.liquidity + protocol.gasEfficiency + protocol.innovation + protocol.community) / 5;
              
              return (
                <motion.div
                  key={protocol.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="text-2xl">{protocol.logo}</div>
                    <div>
                      <h3 className="font-semibold text-white">{protocol.name}</h3>
                      <p className="text-sm text-gray-400">Overall Score: {overallScore.toFixed(1)}/100</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{protocol.apy}%</div>
                      <div className="text-xs text-gray-400">APY</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{protocol.tvl}</div>
                      <div className="text-xs text-gray-400">TVL</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold ${
                        protocol.riskScore <= 30 ? 'text-green-400' :
                        protocol.riskScore <= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {protocol.riskScore}
                      </div>
                      <div className="text-xs text-gray-400">Risk</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProtocolComparison;