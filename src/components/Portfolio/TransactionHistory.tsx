import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, RefreshCw, Zap } from 'lucide-react';

interface TransactionHistoryProps {
  timeframe: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ timeframe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: '1',
      type: 'deposit',
      asset: 'ETH',
      amount: '5.2847',
      value: '$8,420.50',
      protocol: 'Aave',
      strategy: 'Balanced Growth',
      timestamp: '2024-06-15 14:32:18',
      txHash: '0x742d35Cc2C3c3c2Cb8c8C8C9c9c9C9c9C9c9C9c9',
      status: 'completed',
      gasUsed: '0.0024 ETH'
    },
    {
      id: '2',
      type: 'yield',
      asset: 'USDC',
      amount: '127.45',
      value: '$127.45',
      protocol: 'Compound',
      strategy: 'Conservative Yield',
      timestamp: '2024-06-15 12:15:42',
      txHash: '0x8f3e2a1b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      status: 'completed',
      gasUsed: '0.0018 ETH'
    },
    {
      id: '3',
      type: 'rebalance',
      asset: 'WBTC',
      amount: '0.1847',
      value: '$5,240.80',
      protocol: 'Uniswap V3',
      strategy: 'Aggressive Alpha',
      timestamp: '2024-06-14 16:45:33',
      txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      status: 'completed',
      gasUsed: '0.0032 ETH'
    },
    {
      id: '4',
      type: 'withdrawal',
      asset: 'DAI',
      amount: '2,500.00',
      value: '$2,500.00',
      protocol: 'Curve',
      strategy: 'Conservative Yield',
      timestamp: '2024-06-14 09:22:15',
      txHash: '0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c',
      status: 'completed',
      gasUsed: '0.0021 ETH'
    },
    {
      id: '5',
      type: 'compound',
      asset: 'LINK',
      amount: '45.67',
      value: '$892.15',
      protocol: 'Balancer',
      strategy: 'Balanced Growth',
      timestamp: '2024-06-13 20:18:47',
      txHash: '0x5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d',
      status: 'completed',
      gasUsed: '0.0019 ETH'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Transactions' },
    { id: 'deposit', label: 'Deposits' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'yield', label: 'Yield Claims' },
    { id: 'rebalance', label: 'Rebalances' },
    { id: 'compound', label: 'Compounds' }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'yield':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'rebalance':
        return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'compound':
        return <TrendingUp className="w-4 h-4 text-purple-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-500/20 text-green-400';
      case 'withdrawal':
        return 'bg-red-500/20 text-red-400';
      case 'yield':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rebalance':
        return 'bg-blue-500/20 text-blue-400';
      case 'compound':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.strategy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || tx.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300 w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
            <Filter className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors duration-300">
            <Download className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </motion.div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white capitalize">
                        {transaction.type} {transaction.asset}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{transaction.protocol}</span>
                      <span>•</span>
                      <span>{transaction.strategy}</span>
                      <span>•</span>
                      <span>{transaction.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-white">
                    {transaction.type === 'withdrawal' ? '-' : '+'}{transaction.amount} {transaction.asset}
                  </div>
                  <div className="text-sm text-gray-400">{transaction.value}</div>
                  <div className="text-xs text-gray-500">Gas: {transaction.gasUsed}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Tx Hash:</span>
                  <code className="text-xs text-[#667eea] font-mono">
                    {transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-8)}
                  </code>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 capitalize">{transaction.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TransactionHistory;