import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  balance: string;
  network: string;
  walletType: string | null;
}

interface WalletContextType {
  wallet: WalletState;
  connectWallet: (walletType: string) => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: string) => Promise<void>;
  signTransaction: (tx: any) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    balance: '0',
    network: 'ethereum',
    walletType: null
  });

  const connectWallet = useCallback(async (walletType: string) => {
    setWallet(prev => ({ ...prev, isConnecting: true }));
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock wallet connection
      const mockAddress = '0x742d35Cc2C3c3c2Cb8c8C8C9c9c9C9c9C9c9C9c9';
      const mockBalance = '12.5847';
      
      setWallet({
        address: mockAddress,
        isConnecting: false,
        isConnected: true,
        balance: mockBalance,
        network: 'ethereum',
        walletType
      });

      // Show success notification
      if (window.showToast) {
        window.showToast('Wallet connected successfully!', 'success');
      }
    } catch (error) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
      if (window.showToast) {
        window.showToast('Failed to connect wallet', 'error');
      }
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      isConnecting: false,
      isConnected: false,
      balance: '0',
      network: 'ethereum',
      walletType: null
    });
    
    if (window.showToast) {
      window.showToast('Wallet disconnected', 'info');
    }
  }, []);

  const switchNetwork = useCallback(async (network: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWallet(prev => ({ ...prev, network }));
      
      if (window.showToast) {
        window.showToast(`Switched to ${network}`, 'success');
      }
    } catch (error) {
      if (window.showToast) {
        window.showToast('Failed to switch network', 'error');
      }
    }
  }, []);

  const signTransaction = useCallback(async (tx: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const txHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      if (window.showToast) {
        window.showToast('Transaction signed successfully!', 'success');
      }
      
      return txHash;
    } catch (error) {
      if (window.showToast) {
        window.showToast('Transaction failed', 'error');
      }
      throw error;
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      wallet,
      connectWallet,
      disconnectWallet,
      switchNetwork,
      signTransaction
    }}>
      {children}
    </WalletContext.Provider>
  );
};