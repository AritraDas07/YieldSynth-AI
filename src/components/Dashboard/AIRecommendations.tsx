import React, { useState } from 'react';
import { Bot, TrendingUp, Shield, Zap, ChevronRight } from 'lucide-react';

const AIRecommendations: React.FC = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);

  const recommendations = [
    {
      type: 'Optimization',
      title: 'Rebalance to Curve Finance',
      description: 'AI detected 2.3% higher yield opportunity in Curve stablecoin pools',
      impact: '+$124.50/month',
      confidence: 94,
      risk: 'Low',
      action: 'Rebalance Now',
      icon: TrendingUp,
      gradient: 'from-[#667eea] to-[#764ba2]'
    },
    {
      type: 'Risk Management',
      title: 'Reduce Uniswap V3 Position',
      description: 'High impermanent loss risk detected due to increased ETH volatility',
      impact: 'Protect $890.20',
      confidence: 87,
      risk: 'Medium',
      action: 'Adjust Position',
      icon: Shield,
      gradient: 'from-[#f093fb] to-[#f5576c]'
    },
    {
      type: 'Opportunity',
      title: 'New Yield Farm Detected',
      description: 'Balancer V2 pool offering 12.8% APY with acceptable risk profile',
      impact: '+$287.30/month',
      confidence: 78,
      risk: 'Medium',
      action: 'Deploy Funds',
      icon: Zap,
      gradient: 'from-[#00f5a0] to-[#00d4aa]'
    }
  ];

  const handleExecuteRecommendation = (index: number) => {
    setSelectedRecommendation(index);
    // Simulate execution
    setTimeout(() => {
      setSelectedRecommendation(null);
      if (window.showToast) {
        window.showToast('Recommendation executed successfully!', 'success');
      }
    }, 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
          <p className="text-sm text-gray-400">Powered by genetic algorithms</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            onClick={() => handleExecuteRecommendation(index)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 bg-gradient-to-br ${rec.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <rec.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {rec.type}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      rec.risk === 'Low' ? 'bg-green-400' :
                      rec.risk === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="text-xs text-gray-400">{rec.risk} Risk</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1 group-hover:gradient-text transition-all duration-300">
                  {rec.title}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{rec.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-sm font-medium text-green-400">{rec.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-12 bg-white/10 rounded-full h-1">
                        <div
                          className="h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{rec.confidence}%</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedRecommendation === index ? (
                      <div className="w-4 h-4 border-2 border-[#667eea] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#667eea] transition-colors duration-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">AI Confidence Score</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-white/10 rounded-full h-2">
              <div className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full w-[86%]" />
            </div>
            <span className="text-white font-medium">86%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;