import React from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Shield, AlertTriangle, TrendingDown, Activity, Target, Zap } from 'lucide-react';

interface RiskAnalysisProps {
  timeframe: string;
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ timeframe }) => {
  const riskData = [
    { subject: 'Liquidity', A: 85, fullMark: 100 },
    { subject: 'Volatility', A: 65, fullMark: 100 },
    { subject: 'Concentration', A: 75, fullMark: 100 },
    { subject: 'Protocol', A: 90, fullMark: 100 },
    { subject: 'Market', A: 70, fullMark: 100 },
    { subject: 'Correlation', A: 80, fullMark: 100 }
  ];

  const varData = [
    { date: '2024-01', var95: 4.2, var99: 6.8 },
    { date: '2024-02', var95: 4.5, var99: 7.1 },
    { date: '2024-03', var95: 3.8, var99: 6.2 },
    { date: '2024-04', var95: 4.1, var99: 6.5 },
    { date: '2024-05', var95: 3.9, var99: 6.3 },
    { date: '2024-06', var95: 4.3, var99: 6.9 }
  ];

  const riskMetrics = [
    {
      title: 'Portfolio Risk Score',
      value: '6.5/10',
      status: 'Medium',
      icon: Shield,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Value at Risk (95%)',
      value: '4.3%',
      status: 'Acceptable',
      icon: TrendingDown,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Max Drawdown',
      value: '8.5%',
      status: 'Low',
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Correlation Risk',
      value: '0.72',
      status: 'High',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    }
  ];

  const riskFactors = [
    {
      factor: 'Smart Contract Risk',
      level: 'Low',
      score: 85,
      description: 'All protocols are audited and battle-tested'
    },
    {
      factor: 'Liquidity Risk',
      level: 'Medium',
      score: 70,
      description: 'Some positions may have limited exit liquidity'
    },
    {
      factor: 'Market Risk',
      level: 'Medium',
      score: 65,
      description: 'Exposure to crypto market volatility'
    },
    {
      factor: 'Concentration Risk',
      level: 'Low',
      score: 80,
      description: 'Well diversified across assets and protocols'
    },
    {
      factor: 'Impermanent Loss',
      level: 'Medium',
      score: 60,
      description: 'LP positions subject to impermanent loss'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bgColor}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${metric.bgColor} ${metric.color}`}>
                {metric.status}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-gray-400 text-sm">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Risk Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Risk Profile Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={riskData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                />
                <Radar
                  name="Risk Score"
                  dataKey="A"
                  stroke="#667eea"
                  fill="#667eea"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* VaR Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Value at Risk Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={varData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
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
                  dataKey="var95"
                  stroke="#667eea"
                  strokeWidth={2}
                  dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                  name="VaR 95%"
                />
                <Line
                  type="monotone"
                  dataKey="var99"
                  stroke="#f093fb"
                  strokeWidth={2}
                  dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                  name="VaR 99%"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Risk Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Risk Factor Analysis</h2>
        <div className="space-y-6">
          {riskFactors.map((factor, index) => (
            <motion.div
              key={factor.factor}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{factor.factor}</h3>
                  <p className="text-sm text-gray-400">{factor.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getScoreColor(factor.score)}`}>
                    {factor.score}/100
                  </div>
                  <div className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                    {factor.level}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 bg-gradient-to-r ${getScoreBarColor(factor.score)} rounded-full transition-all duration-1000`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Risk Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Risk Management Recommendations</h2>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
            Apply Suggestions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-[#667eea]" />
              <span>Immediate Actions</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Reduce correlation exposure</p>
                  <p className="text-xs text-gray-400">Consider diversifying into uncorrelated assets</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Monitor liquidity conditions</p>
                  <p className="text-xs text-gray-400">Some positions may have exit constraints</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#667eea]" />
              <span>Optimization Opportunities</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Implement stop-loss mechanisms</p>
                  <p className="text-xs text-gray-400">Automated risk management triggers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 glass-card rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">Increase protocol diversification</p>
                  <p className="text-xs text-gray-400">Spread risk across more DeFi protocols</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskAnalysis;