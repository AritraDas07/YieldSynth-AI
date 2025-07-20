import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, Zap } from 'lucide-react';

interface AIInsightsProps {
  timeframe: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ timeframe }) => {
  const insights = [
    {
      type: 'opportunity',
      title: 'High-Yield Arbitrage Detected',
      description: 'AI identified a 2.3% yield differential between Curve and Balancer for USDC-DAI pairs',
      confidence: 94,
      impact: 'High',
      timeframe: '24 hours',
      action: 'Rebalance to Curve',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      type: 'risk',
      title: 'Correlation Risk Increasing',
      description: 'Portfolio correlation with ETH has increased to 0.78, suggesting reduced diversification',
      confidence: 87,
      impact: 'Medium',
      timeframe: '7 days',
      action: 'Diversify assets',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      type: 'optimization',
      title: 'Gas Efficiency Improvement',
      description: 'Batching transactions could reduce gas costs by 35% while maintaining yield performance',
      confidence: 91,
      impact: 'Medium',
      timeframe: '3 days',
      action: 'Enable batching',
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      type: 'market',
      title: 'New Protocol Launch',
      description: 'Newly launched protocol offering 15.2% APY with acceptable risk metrics',
      confidence: 76,
      impact: 'High',
      timeframe: '48 hours',
      action: 'Evaluate allocation',
      icon: Lightbulb,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  const marketPredictions = [
    {
      metric: 'DeFi TVL',
      current: '$58.9B',
      predicted: '$67.2B',
      change: '+14.1%',
      confidence: 82,
      timeframe: '30 days'
    },
    {
      metric: 'Average APY',
      current: '8.4%',
      predicted: '9.7%',
      change: '+1.3%',
      confidence: 78,
      timeframe: '30 days'
    },
    {
      metric: 'Market Volatility',
      current: '13.2%',
      predicted: '16.8%',
      change: '+3.6%',
      confidence: 85,
      timeframe: '30 days'
    },
    {
      metric: 'Gas Prices',
      current: '25 gwei',
      predicted: '18 gwei',
      change: '-28%',
      confidence: 71,
      timeframe: '30 days'
    }
  ];

  const aiRecommendations = [
    {
      category: 'Asset Allocation',
      recommendations: [
        'Increase USDC allocation by 5% for stability',
        'Reduce ETH exposure by 3% to lower correlation',
        'Add LINK position for diversification'
      ]
    },
    {
      category: 'Protocol Selection',
      recommendations: [
        'Migrate 20% of Compound position to Aave',
        'Explore Curve metapools for better yields',
        'Consider Balancer V2 for ETH-WBTC pair'
      ]
    },
    {
      category: 'Risk Management',
      recommendations: [
        'Implement stop-loss at 15% drawdown',
        'Set correlation alerts at 0.8 threshold',
        'Enable automatic rebalancing triggers'
      ]
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-400 bg-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Intelligence Center</h2>
            <p className="text-gray-400">Advanced machine learning insights and predictions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">94%</div>
            <div className="text-sm text-gray-400">AI Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">+2.3%</div>
            <div className="text-sm text-gray-400">Yield Opportunity</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-sm text-gray-400">Active Insights</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">12</div>
            <div className="text-sm text-gray-400">Recommendations</div>
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Real-Time AI Insights</h2>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${insight.bgColor}`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                      {insight.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact} Impact
                      </div>
                      <div className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Timeframe: {insight.timeframe}</span>
                      <span>•</span>
                      <span>Type: {insight.type}</span>
                    </div>
                    <button className="px-3 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg text-xs font-medium hover:scale-105 transition-all duration-300">
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">AI Market Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <h3 className="font-semibold text-white mb-3">{prediction.metric}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current:</span>
                  <span className="text-white">{prediction.current}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Predicted:</span>
                  <span className="text-white">{prediction.predicted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Change:</span>
                  <span className={`font-medium ${
                    prediction.change.startsWith('+') ? 'text-green-400' : 
                    prediction.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {prediction.change}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Confidence:</span>
                    <span className={getConfidenceColor(prediction.confidence)}>
                      {prediction.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300">
            Apply All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiRecommendations.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-[#667eea]" />
                <h3 className="font-semibold text-white">{category.category}</h3>
              </div>
              
              <div className="space-y-3">
                {category.recommendations.map((rec, recIndex) => (
                  <div key={recIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#667eea] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-300">{rec}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Learning Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">AI Learning & Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-4">Model Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Prediction Accuracy</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full w-[87%]" />
                  </div>
                  <span className="text-white font-medium">87%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Risk Assessment</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 bg-gradient-to-r from-[#00f5a0] to-[#00d4aa] rounded-full w-[92%]" />
                  </div>
                  <span className="text-white font-medium">92%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Yield Optimization</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 bg-gradient-to-r from-[#f093fb] to-[#f5576c] rounded-full w-[89%]" />
                  </div>
                  <span className="text-white font-medium">89%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div className="glass-card rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Data Points Processed</span>
                  <span className="text-sm text-[#667eea] font-medium">2.4M</span>
                </div>
                <div className="text-xs text-gray-400">Last 24 hours</div>
              </div>
              
              <div className="glass-card rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Model Updates</span>
                  <span className="text-sm text-[#f093fb] font-medium">47</span>
                </div>
                <div className="text-xs text-gray-400">This week</div>
              </div>
              
              <div className="glass-card rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Success Rate</span>
                  <span className="text-sm text-[#00f5a0] font-medium">94.2%</span>
                </div>
                <div className="text-xs text-gray-400">Recommendation accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIInsights;