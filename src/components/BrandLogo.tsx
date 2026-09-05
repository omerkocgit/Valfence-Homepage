/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark-only';
  theme?: 'dark' | 'light' | 'mono-white' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'auto',
  className = '',
  size = 'md',
}) => {
  const gradientId = useId().replace(/:/g, '');
  // Dimension scaling
  const sizeMap = {
    sm: { height: 28, textClass: 'text-sm tracking-[0.25em]', gap: 'gap-2.5' },
    md: { height: 34, textClass: 'text-base tracking-[0.28em]', gap: 'gap-3' },
    lg: { height: 48, textClass: 'text-xl tracking-[0.3em]', gap: 'gap-4' },
    xl: { height: 64, textClass: 'text-2xl tracking-[0.35em]', gap: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  // Colors based on theme
  const textColor =
    theme === 'mono-white'
      ? 'text-white'
      : theme === 'dark'
      ? 'text-slate-100'
      : theme === 'light'
      ? 'text-[#0B1E36]'
      : 'text-[#0B1E36] dark:text-slate-100';

  return (
    <div
      className={`inline-flex items-center select-none ${
        variant === 'stacked' ? 'flex-col justify-center text-center' : 'flex-row'
      } ${currentSize.gap} ${className}`}
    >
      {/* Official VALFENCE Geometric Vector Mark: Angular V with 3 Ascending Valuation Bars */}
      <svg
        height={currentSize.height}
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-mark shrink-0 transition-transform duration-200"
        aria-label="VALFENCE Logo"
      >
        <defs>
          <linearGradient id={`${gradientId}-v`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1E36" />
            <stop offset="60%" stopColor="#0F3260" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id={`${gradientId}-bar1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E2F59" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id={`${gradientId}-bar2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0B1E36" />
          </linearGradient>
          <linearGradient id={`${gradientId}-bar3`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0B1E36" />
          </linearGradient>
        </defs>

        {/* Left Wing of the V Mark (Thick diagonal descending) */}
        <polygon
          points="20,10 46,10 82,90 60,90"
          fill={`url(#${gradientId}-v)`}
        />

        {/* Diagonal connecting base */}
        <polygon
          points="60,90 82,90 98,54 78,54"
          fill="#0B1E36"
        />

        {/* Bar 1 (Shortest bar in ascending trio) */}
        <polygon
          points="88,48 102,40 102,90 88,90"
          fill={`url(#${gradientId}-bar1)`}
        />

        {/* Bar 2 (Middle bar in ascending trio) */}
        <polygon
          points="108,30 124,20 124,90 108,90"
          fill={`url(#${gradientId}-bar2)`}
        />

        {/* Bar 3 (Tallest peak bar in ascending trio) */}
        <polygon
          points="130,12 148,0 148,90 130,90"
          fill={`url(#${gradientId}-bar3)`}
        />
      </svg>

      {/* Wordmark: V A L F E N C E */}
      {variant !== 'mark-only' && (
        <span
          className={`font-sans font-bold uppercase ${textColor} ${currentSize.textClass} font-semibold`}
          style={{ letterSpacing: '0.28em' }}
        >
          VALFENCE
        </span>
      )}
    </div>
  );
};
