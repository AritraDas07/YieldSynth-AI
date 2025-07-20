import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, Target } from 'lucide-react';

interface MarketAnalysisProps {
  timeframe: string;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ timeframe }) => {
  const marketData = [
    { date: '2024-01', tvl: 45.2, volume: 12.8, apy: 6.2, volatility: 15.3 },
    { date: '2024-02', tvl: 48.7, volume: 14.2, apy: 6.8, volatility: 18.1 },
    { date: '2024-03', tvl: 52.1, volume: 16.5, apy: 7.2, volatility: 16.7 },
    { date: '2024-04', tvl: 49.8, volume: 15.1, apy: 6.9, volatility: 19.2 },
    { date: '2024-05', tvl: 55.3, volume: 18.7, apy: 7.8, volatility: 14.8 },
    { date: '2024-06', tvl: 58.9, volume: 21.3, apy: 8.4, volatility: 13.2 }
  ];

  const protocolTVL = [
    { name: 'Aave', tvl: 12.8, change: 5.2 },
    { name: 'Compound', tvl: 8.5, change: 3.1 },
    { name: 'Uniswap V3', tvl: 5.2, change: 8.7 },
    { name: 'Curve', tvl: 4.1, change: 2.8 },
    { name: 'Balancer', tvl: 2.9, change: 6.4 },
    { name: 'Yearn', tvl: 1.8, change: 4.9 }
  ];

  const marketMetrics = [
    {
      title: 'Total DeFi TVL',
      value: '$58.9B',
      change: '+12.8%',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Average APY',
      value: '8.4%',
      change: '+1.2%',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Market Volatility',
      value: '13.2%',
      change: '-2.1%',
      icon: Activity,
      color: 'text-yellow-400'
    },
    {
      title: 'Active Protocols',
      value: '127',
      change: '+8',
      icon: Target,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                metric.change.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-gray-400 text-sm">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Market Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">DeFi Market Trends</h2>
            <p className="text-sm text-gray-400">TVL and APY trends over time ({timeframe})</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#667eea] rounded-full" />
              <span className="text-sm text-gray-400">TVL ($B)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f093fb] rounded-full" />
              <span className="text-sm text-gray-400">APY (%)</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="apyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f093fb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f093fb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
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
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tvl"
                stroke="#667eea"
                fillOpacity={1}
                fill="url(#tvlGradient)"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="apy"
                stroke="#f093fb"
                strokeWidth={2}
                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Protocol TVL Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Protocol TVL Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={protocolTVL}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
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
              <Bar 
                dataKey="tvl" 
                fill="url(#protocolGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="protocolGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Market Opportunities</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">High Yield Farming Opportunities</h3>
                <p className="text-sm text-gray-400">New liquidity mining programs offering 15%+ APY</p>
                <span className="text-xs text-green-400 font-medium">+15.2% potential yield</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">Arbitrage Opportunities</h3>
                <p className="text-sm text-gray-400">Price discrepancies across DEXs for optimal swaps</p>
                <span className="text-xs text-blue-400 font-medium">+2.3% arbitrage potential</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">New Protocol Launches</h3>
                <p className="text-sm text-gray-400">Early access to promising new DeFi protocols</p>
                <span className="text-xs text-purple-400 font-medium">Early adopter rewards</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Market Risks</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">Increased Volatility</h3>
                <p className="text-sm text-gray-400">Market volatility above historical averages</p>
                <span className="text-xs text-red-400 font-medium">High risk period</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">Liquidity Concerns</h3>
                <p className="text-sm text-gray-400">Some protocols showing reduced liquidity depth</p>
                <span className="text-xs text-yellow-400 font-medium">Monitor closely</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 glass-card rounded-xl">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
              <div>
                <h3 className="font-semibold text-white">Regulatory Updates</h3>
                <p className="text-sm text-gray-400">Potential regulatory changes affecting DeFi</p>
                <span className="text-xs text-orange-400 font-medium">Stay informed</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketAnalysis;