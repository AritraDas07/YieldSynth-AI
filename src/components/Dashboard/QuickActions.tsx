import React, { useState } from 'react';
import { Plus, RefreshCw, Target, Settings, Zap, TrendingUp } from 'lucide-react';

const QuickActions: React.FC = () => {
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'rebalance',
      title: 'AI Rebalance',
      description: 'Optimize all positions',
      icon: RefreshCw,
      gradient: 'from-[#667eea] to-[#764ba2]',
      estimatedTime: '~2 min'
    },
    {
      id: 'newStrategy',
      title: 'New Strategy',
      description: 'Create yield farm',
      icon: Plus,
      gradient: 'from-[#f093fb] to-[#f5576c]',
      estimatedTime: '~5 min'
    },
    {
      id: 'harvest',
      title: 'Harvest Yields',
      description: 'Compound rewards',
      icon: TrendingUp,
      gradient: 'from-[#00f5a0] to-[#00d4aa]',
      estimatedTime: '~1 min'
    },
    {
      id: 'optimize',
      title: 'Risk Analysis',
      description: 'Assess portfolio',
      icon: Target,
      gradient: 'from-[#ffb74d] to-[#ff9800]',
      estimatedTime: '~3 min'
    }
  ];

  const handleExecuteAction = async (actionId: string) => {
    setIsExecuting(actionId);
    
    // Simulate action execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExecuting(null);
    
    if (window.showToast) {
      const action = quickActions.find(a => a.id === actionId);
      window.showToast(`${action?.title} completed successfully!`, 'success');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <p className="text-sm text-gray-400">One-click operations</p>
        </div>
      </div>

      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleExecuteAction(action.id)}
            disabled={isExecuting === action.id}
            className="w-full glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {isExecuting === action.id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <action.icon className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">{action.estimatedTime}</div>
                <div className="text-sm text-[#667eea] group-hover:text-[#764ba2] transition-colors duration-300">
                  →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 glass-card rounded-xl hover:bg-white/5 transition-all duration-300 group">
          <Settings className="w-4 h-4 text-gray-400 group-hover:text-[#667eea] transition-colors duration-300" />
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
            Advanced Settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;