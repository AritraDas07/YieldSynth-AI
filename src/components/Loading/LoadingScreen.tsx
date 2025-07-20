import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Bot, Zap, TrendingUp, Shield, Target, Activity } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const loadingSteps = [
    { label: 'Initializing AI Engine', icon: Bot, duration: 1000 },
    { label: 'Loading DeFi Protocols', icon: Zap, duration: 800 },
    { label: 'Analyzing Market Data', icon: TrendingUp, duration: 900 },
    { label: 'Securing Connections', icon: Shield, duration: 700 },
    { label: 'Optimizing Strategies', icon: Target, duration: 800 },
    { label: 'Ready to Launch!', icon: Activity, duration: 500 }
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Show content after brief delay
    const showTimer = setTimeout(() => setShowContent(true), 300);

    let totalDuration = 0;
    const stepTimers: NodeJS.Timeout[] = [];

    loadingSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index);
        setProgress(((index + 1) / loadingSteps.length) * 100);
      }, totalDuration);
      
      stepTimers.push(timer);
      totalDuration += step.duration;
    });

    // Complete loading
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, totalDuration + 500);

    return () => {
      clearTimeout(showTimer);
      stepTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  const CurrentIcon = loadingSteps[currentStep]?.icon || Bot;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Spline Background */}
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/JdQ6j0n5-vXTMSfQ/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23]/60 via-[#1a1a2e]/40 to-[#16213e]/60" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full opacity-30"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8"
            >
              {/* Top Section */}
              <div className="w-full max-w-2xl mx-auto text-center mb-auto pt-16">
                {/* Brand Title */}
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold mb-6"
                >
                  <span className="gradient-text-animated">YieldSynth AI</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
                >
                  Intelligent Yield Farming, Automated Excellence
                </motion.p>

                {/* Current Step */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center space-x-4 mb-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center"
                  >
                    <CurrentIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <motion.h3
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-semibold text-white"
                    >
                      {loadingSteps[currentStep]?.label || 'Initializing...'}
                    </motion.h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-[#667eea] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-400">Processing...</span>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-full max-w-md mx-auto mb-6"
                >
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Step Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex justify-center space-x-3"
                >
                  {loadingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentStep
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] scale-110'
                          : 'bg-white/20'
                      }`}
                      animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center text-gray-500 text-sm mt-auto pb-8"
              >
                <p>Powered by Genetic Algorithms & Reinforcement Learning</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="w-1 h-1 bg-[#667eea] rounded-full animate-pulse" />
                  <span>Securing your DeFi future</span>
                  <div className="w-1 h-1 bg-[#667eea] rounded-full animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;