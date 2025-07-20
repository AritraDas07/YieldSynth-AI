import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { X, Wallet, Shield, Zap } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet, wallet } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const wallets = [
    {
      name: 'MetaMask',
      description: 'Connect using MetaMask wallet',
      icon: '🦊',
      type: 'metamask',
      popular: true
    },
    {
      name: 'WalletConnect',
      description: 'Connect using WalletConnect protocol',
      icon: '🔗',
      type: 'walletconnect',
      popular: true
    },
    {
      name: 'Coinbase Wallet',
      description: 'Connect using Coinbase Wallet',
      icon: '🔵',
      type: 'coinbase',
      popular: false
    },
    {
      name: 'Ledger',
      description: 'Connect using Ledger hardware wallet',
      icon: '🔐',
      type: 'ledger',
      popular: false
    }
  ];

  const handleConnect = async (walletType: string) => {
    setSelectedWallet(walletType);
    try {
      await connectWallet(walletType);
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setSelectedWallet(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
              <p className="text-sm text-gray-400">Choose your preferred wallet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {wallets.map((walletOption) => (
            <button
              key={walletOption.type}
              onClick={() => handleConnect(walletOption.type)}
              disabled={wallet.isConnecting && selectedWallet === walletOption.type}
              className="w-full p-4 glass-card rounded-xl hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{walletOption.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white group-hover:gradient-text transition-all duration-300">
                      {walletOption.name}
                    </h3>
                    {walletOption.popular && (
                      <span className="px-2 py-1 text-xs bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{walletOption.description}</p>
                </div>
                {wallet.isConnecting && selectedWallet === walletOption.type ? (
                  <div className="w-6 h-6 border-2 border-[#667eea] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-6 h-6 text-gray-400 group-hover:text-[#667eea] transition-colors duration-300">
                    →
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Your funds remain in your wallet</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>AI-powered optimization and execution</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <Wallet className="w-4 h-4 text-purple-400" />
            <span>One-click strategy deployment</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By connecting your wallet, you agree to our{' '}
            <a href="#" className="text-[#667eea] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#667eea] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;