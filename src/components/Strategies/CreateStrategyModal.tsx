import React, { useState } from 'react';
import { X, Bot, Target, DollarSign, Shield, Zap } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

interface CreateStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStrategyModal: React.FC<CreateStrategyModalProps> = ({ isOpen, onClose }) => {
  const { wallet } = useWallet();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  
  const [strategyData, setStrategyData] = useState({
    name: '',
    riskTolerance: 5,
    initialAmount: '',
    selectedTokens: [] as string[],
    selectedProtocols: [] as string[]
  });

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'DAI', name: 'Dai Stablecoin', icon: '◈' },
    { symbol: 'LINK', name: 'Chainlink', icon: '🔗' },
    { symbol: 'UNI', name: 'Uniswap', icon: '🦄' }
  ];

  const protocols = [
    { name: 'Aave', apy: 4.2, risk: 'Low', icon: '🅰️' },
    { name: 'Compound', apy: 3.8, risk: 'Low', icon: '🔄' },
    { name: 'Uniswap V3', apy: 8.5, risk: 'Medium', icon: '🦄' },
    { name: 'Curve', apy: 6.3, risk: 'Low', icon: '⚡' },
    { name: 'Balancer', apy: 7.8, risk: 'Medium', icon: '⚖️' },
    { name: 'Yearn', apy: 9.2, risk: 'Medium', icon: '💰' }
  ];

  const handleTokenToggle = (token: string) => {
    setStrategyData(prev => ({
      ...prev,
      selectedTokens: prev.selectedTokens.includes(token)
        ? prev.selectedTokens.filter(t => t !== token)
        : [...prev.selectedTokens, token]
    }));
  };

  const handleProtocolToggle = (protocol: string) => {
    setStrategyData(prev => ({
      ...prev,
      selectedProtocols: prev.selectedProtocols.includes(protocol)
        ? prev.selectedProtocols.filter(p => p !== protocol)
        : [...prev.selectedProtocols, protocol]
    }));
  };

  const handleCreateStrategy = async () => {
    setIsCreating(true);
    
    // Simulate strategy creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsCreating(false);
    
    if (window.showToast) {
      window.showToast('Strategy created successfully!', 'success');
    }
    
    onClose();
    setStep(1);
    setStrategyData({
      name: '',
      riskTolerance: 5,
      initialAmount: '',
      selectedTokens: [],
      selectedProtocols: []
    });
  };

  const getRiskLabel = (risk: number) => {
    if (risk <= 3) return 'Conservative';
    if (risk <= 7) return 'Balanced';
    return 'Aggressive';
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return 'text-green-400';
    if (risk <= 7) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create AI Strategy</h2>
              <p className="text-sm text-gray-400">Step {step} of 4</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <div
            className="h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Strategy Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Strategy Name
                  </label>
                  <input
                    type="text"
                    value={strategyData.name}
                    onChange={(e) => setStrategyData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., My Conservative DeFi Strategy"
                    className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Investment Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={strategyData.initialAmount}
                      onChange={(e) => setStrategyData(prev => ({ ...prev, initialAmount: e.target.value }))}
                      placeholder="1000"
                      className="w-full pl-10 pr-4 p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!strategyData.name || !strategyData.initialAmount}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Risk Settings
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Risk Tolerance */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk Tolerance</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Risk Level
                    </label>
                    <div className="flex items-center space-x-2">
                      <Shield className={`w-4 h-4 ${getRiskColor(strategyData.riskTolerance)}`} />
                      <span className={`text-sm font-medium ${getRiskColor(strategyData.riskTolerance)}`}>
                        {getRiskLabel(strategyData.riskTolerance)}
                      </span>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strategyData.riskTolerance}
                    onChange={(e) => setStrategyData(prev => ({ ...prev, riskTolerance: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                      <Shield className="w-4 h-4 text-green-400" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Conservative</h4>
                    <p className="text-xs text-gray-400">3-5% APY, Low risk</p>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-3">
                      <Target className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Balanced</h4>
                    <p className="text-xs text-gray-400">6-9% APY, Medium risk</p>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-4 h-4 text-red-400" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Aggressive</h4>
                    <p className="text-xs text-gray-400">10%+ APY, High risk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 glass-card rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300"
              >
                Next: Select Assets
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Token Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Assets</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => handleTokenToggle(token.symbol)}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      strategyData.selectedTokens.includes(token.symbol)
                        ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                        : 'glass-card hover:bg-white/5'
                    }`}
                  >
                    <div className="text-2xl mb-2">{token.icon}</div>
                    <div className="font-medium text-sm">{token.symbol}</div>
                    <div className="text-xs text-gray-400">{token.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 glass-card rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={strategyData.selectedTokens.length === 0}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Select Protocols
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Protocol Selection */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Protocols</h3>
              
              <div className="space-y-3">
                {protocols.map((protocol) => (
                  <button
                    key={protocol.name}
                    onClick={() => handleProtocolToggle(protocol.name)}
                    className={`w-full p-4 rounded-xl transition-all duration-300 ${
                      strategyData.selectedProtocols.includes(protocol.name)
                        ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                        : 'glass-card hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{protocol.icon}</div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium">{protocol.name}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>APY: {protocol.apy}%</span>
                          <span>Risk: {protocol.risk}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-4">
              <h4 className="font-medium text-white mb-2">Strategy Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{strategyData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Investment:</span>
                  <span className="text-white">${strategyData.initialAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Level:</span>
                  <span className={getRiskColor(strategyData.riskTolerance)}>
                    {getRiskLabel(strategyData.riskTolerance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Assets:</span>
                  <span className="text-white">{strategyData.selectedTokens.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Protocols:</span>
                  <span className="text-white">{strategyData.selectedProtocols.length} selected</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 glass-card rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={handleCreateStrategy}
                disabled={strategyData.selectedProtocols.length === 0 || isCreating || !wallet.isConnected}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  {isCreating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>{isCreating ? 'Creating Strategy...' : 'Create Strategy'}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStrategyModal;