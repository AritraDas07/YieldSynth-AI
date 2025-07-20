import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProtocolData {
  name: string;
  apy: number;
  tvl: string;
  riskScore: number;
  logo: string;
}

interface VaultData {
  id: string;
  name: string;
  totalValue: string;
  apy: number;
  riskLevel: number;
  tokens: string[];
  protocols: string[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

interface DataContextType {
  protocols: ProtocolData[];
  vaults: VaultData[];
  totalTVL: string;
  totalYield: string;
  activeStrategies: number;
  isLoading: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const protocols: ProtocolData[] = [
    { name: 'Aave', apy: 4.2, tvl: '$12.8B', riskScore: 20, logo: '🅰️' },
    { name: 'Compound', apy: 3.8, tvl: '$8.5B', riskScore: 25, logo: '🔄' },
    { name: 'Uniswap V3', apy: 8.5, tvl: '$5.2B', riskScore: 45, logo: '🦄' },
    { name: 'Curve', apy: 6.3, tvl: '$4.1B', riskScore: 30, logo: '⚡' },
    { name: 'Balancer', apy: 7.8, tvl: '$2.9B', riskScore: 40, logo: '⚖️' },
    { name: 'Yearn', apy: 9.2, tvl: '$1.8B', riskScore: 35, logo: '💰' }
  ];

  const vaults: VaultData[] = [
    {
      id: '1',
      name: 'Conservative Yield',
      totalValue: '$25,420.80',
      apy: 4.5,
      riskLevel: 2,
      tokens: ['USDC', 'DAI', 'USDT'],
      protocols: ['Aave', 'Compound'],
      performance: { daily: 0.12, weekly: 0.85, monthly: 3.2 }
    },
    {
      id: '2',
      name: 'Balanced Growth',
      totalValue: '$18,750.45',
      apy: 7.8,
      riskLevel: 5,
      tokens: ['ETH', 'WBTC', 'DAI'],
      protocols: ['Uniswap V3', 'Curve'],
      performance: { daily: 0.21, weekly: 1.48, monthly: 6.7 }
    },
    {
      id: '3',
      name: 'Aggressive Alpha',
      totalValue: '$32,890.12',
      apy: 12.4,
      riskLevel: 8,
      tokens: ['ETH', 'LINK', 'UNI', 'AAVE'],
      protocols: ['Balancer', 'Yearn'],
      performance: { daily: 0.34, weekly: 2.12, monthly: 9.8 }
    }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  useEffect(() => {
    // Simulate data loading after initial app load
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataContext.Provider value={{
      protocols,
      vaults,
      totalTVL: '$127.8M',
      totalYield: '$2,847.32',
      activeStrategies: 3,
      isLoading,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};