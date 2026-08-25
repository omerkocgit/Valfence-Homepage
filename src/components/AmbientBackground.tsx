import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Static GPU-Accelerated Atmospheric Light Flares (Zero CPU/GPU animation overhead) */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-radial from-sky-400/12 via-blue-500/5 to-transparent dark:from-sky-500/10 dark:via-blue-600/5 dark:to-transparent pointer-events-none transform-gpu" />
      <div className="absolute top-[35%] left-0 w-[600px] h-[600px] rounded-full bg-radial from-blue-600/10 via-indigo-500/4 to-transparent dark:from-blue-600/12 dark:via-sky-500/4 dark:to-transparent pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-radial from-emerald-400/10 via-teal-500/4 to-transparent dark:from-emerald-500/10 dark:via-teal-600/4 dark:to-transparent pointer-events-none transform-gpu" />
    </div>
  );
};
