import { useMemo } from 'react';
import type { BookendConfig } from '../App';

interface Props {
  config: BookendConfig;
}

const materialColors: Record<string, { primary: string; secondary: string; shadow: string }> = {
  brass: { primary: '#C9A227', secondary: '#E8D48B', shadow: '#8B7017' },
  marble: { primary: '#E8E4E0', secondary: '#FFFFFF', shadow: '#B8B4B0' },
  walnut: { primary: '#5D432C', secondary: '#8B6914', shadow: '#3D2817' },
  ebony: { primary: '#1A1A1A', secondary: '#3D3D3D', shadow: '#0A0A0A' },
  copper: { primary: '#B87333', secondary: '#DA9F5B', shadow: '#7A4E22' },
};

const patternSvgs: Record<string, (color: string) => JSX.Element> = {
  none: () => <></>,
  chevron: (color: string) => (
    <g stroke={color} strokeWidth="2" fill="none" opacity="0.4">
      {[0, 1, 2, 3, 4].map(i => (
        <polyline key={i} points={`30,${20 + i * 20} 50,${10 + i * 20} 70,${20 + i * 20}`} />
      ))}
    </g>
  ),
  sunburst: (color: string) => (
    <g stroke={color} strokeWidth="1.5" fill="none" opacity="0.35">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 50 + Math.cos(angle) * 35;
        const y2 = 60 + Math.sin(angle) * 35;
        return <line key={i} x1="50" y1="60" x2={x2} y2={y2} />;
      })}
      <circle cx="50" cy="60" r="8" />
    </g>
  ),
  deco: (color: string) => (
    <g stroke={color} strokeWidth="2" fill="none" opacity="0.4">
      <rect x="35" y="25" width="30" height="50" rx="2" />
      <line x1="35" y1="40" x2="65" y2="40" />
      <line x1="35" y1="60" x2="65" y2="60" />
      <line x1="50" y1="25" x2="50" y2="75" />
    </g>
  ),
  lines: (color: string) => (
    <g stroke={color} strokeWidth="1.5" fill="none" opacity="0.3">
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="25" y1={20 + i * 10} x2="75" y2={20 + i * 10} />
      ))}
    </g>
  ),
};

export default function BookendPreview({ config }: Props) {
  const colors = materialColors[config.material];

  const shapePath = useMemo(() => {
    const h = config.height * 10;
    switch (config.shape) {
      case 'classic':
        return `M20,${100} L20,${100-h} L80,${100-h} L80,${100-h+20} L40,${100-h+20} L40,${100} Z`;
      case 'angular':
        return `M20,${100} L20,${100-h} L70,${100-h} L80,${100-h+30} L80,${100} L50,${100} L50,${100-h+40} L35,${100-h+25} L35,${100} Z`;
      case 'curved':
        return `M20,${100} L20,${100-h} Q50,${100-h-15} 80,${100-h} L80,${100-h+25} Q55,${100-h+10} 40,${100-h+25} L40,${100} Z`;
      case 'minimal':
        return `M25,${100} L25,${100-h} L75,${100-h} L75,${100-h+15} L40,${100-h+15} L40,${100} Z`;
      case 'ornate':
        return `M15,${100} L15,${100-h+10} Q20,${100-h} 30,${100-h} L70,${100-h} Q80,${100-h} 85,${100-h+10} L85,${100-h+25} Q75,${100-h+15} 65,${100-h+20} L45,${100-h+20} Q35,${100-h+25} 35,${100-h+35} L35,${100} Z`;
      default:
        return `M20,${100} L20,${100-h} L80,${100-h} L80,${100-h+20} L40,${100-h+20} L40,${100} Z`;
    }
  }, [config.shape, config.height]);

  return (
    <div className="bookend-preview">
      <div className="preview-stage">
        <svg viewBox="0 0 100 110" className="bookend-svg">
          {/* Shadow */}
          <ellipse cx="50" cy="103" rx="35" ry="5" fill={colors.shadow} opacity="0.3" />

          {/* Main bookend shape */}
          <defs>
            <linearGradient id={`grad-${config.material}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="50%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.shadow} />
            </linearGradient>
          </defs>

          <path
            d={shapePath}
            fill={`url(#grad-${config.material})`}
            stroke={colors.shadow}
            strokeWidth="1"
            className="bookend-shape"
          />

          {/* Pattern overlay */}
          {patternSvgs[config.pattern](colors.secondary)}

          {/* Accent line */}
          {config.accent && (
            <line
              x1="20"
              y1={100 - config.height * 10 + 5}
              x2="80"
              y2={100 - config.height * 10 + 5}
              stroke={config.material === 'ebony' ? '#C9A227' : '#1A1A1A'}
              strokeWidth="2"
              className="accent-line"
            />
          )}

          {/* Decorative book silhouettes */}
          <g opacity="0.15" fill={colors.shadow}>
            <rect x="82" y="35" width="8" height="65" rx="1" />
            <rect x="91" y="40" width="6" height="60" rx="1" />
            <rect x="98" y="38" width="5" height="62" rx="1" />
          </g>
        </svg>

        {/* Rotating platform effect */}
        <div className="platform-ring" />
      </div>
    </div>
  );
}
