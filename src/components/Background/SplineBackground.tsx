import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-60">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]" />
      }>
        <Spline
          scene="https://prod.spline.design/JdQ6j0n5-vXTMSfQ/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
};

export default SplineBackground;