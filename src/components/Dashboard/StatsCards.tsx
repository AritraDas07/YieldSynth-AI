import React from 'react';
import { useData } from '../../contexts/DataContext';
import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react';

const StatsCards: React.FC = () => {
  const { totalTVL, totalYield, activeStrategies } = useData();

  const stats = [
    {
      title: 'Total Portfolio Value',
      value: '$77,061.37',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'from-[#667eea] to-[#764ba2]'
    },
    {
      title: 'Total Yield Generated',
      value: totalYield,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-[#f093fb] to-[#f5576c]'
    },
    {
      title: 'Active Strategies',
      value: activeStrategies.toString(),
      change: 'All performing',
      changeType: 'neutral' as const,
      icon: Target,
      gradient: 'from-[#00f5a0] to-[#00d4aa]'
    },
    {
      title: 'Average APY',
      value: '8.4%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Activity,
      gradient: 'from-[#ffb74d] to-[#ff9800]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="glass-card rounded-2xl p-6 card-hover"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              stat.changeType === 'positive' 
                ? 'bg-green-500/20 text-green-400' 
                : stat.changeType === 'negative'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {stat.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-4 w-full bg-white/10 rounded-full h-1">
            <div 
              className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: `${75 + (index * 8)}%`,
                animationDelay: `${(index + 1) * 200}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;