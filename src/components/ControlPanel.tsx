import type { BookendConfig } from '../App';

interface Props {
  config: BookendConfig;
  setConfig: React.Dispatch<React.SetStateAction<BookendConfig>>;
}

const shapes: BookendConfig['shape'][] = ['classic', 'angular', 'curved', 'minimal', 'ornate'];
const materials: BookendConfig['material'][] = ['brass', 'marble', 'walnut', 'ebony', 'copper'];
const patterns: BookendConfig['pattern'][] = ['none', 'chevron', 'sunburst', 'deco', 'lines'];

const materialSwatches: Record<string, string> = {
  brass: 'linear-gradient(135deg, #E8D48B 0%, #C9A227 50%, #8B7017 100%)',
  marble: 'linear-gradient(135deg, #FFFFFF 0%, #E8E4E0 50%, #B8B4B0 100%)',
  walnut: 'linear-gradient(135deg, #8B6914 0%, #5D432C 50%, #3D2817 100%)',
  ebony: 'linear-gradient(135deg, #3D3D3D 0%, #1A1A1A 50%, #0A0A0A 100%)',
  copper: 'linear-gradient(135deg, #DA9F5B 0%, #B87333 50%, #7A4E22 100%)',
};

export default function ControlPanel({ config, setConfig }: Props) {
  const updateConfig = <K extends keyof BookendConfig>(key: K, value: BookendConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="control-panel">
      <div className="panel-header">
        <div className="catalog-number">№ 2024</div>
        <h2 className="panel-title">Specifications</h2>
        <div className="catalog-stamp">CUSTOM</div>
      </div>

      <div className="control-group">
        <label className="control-label">Shape Profile</label>
        <div className="shape-options">
          {shapes.map(shape => (
            <button
              key={shape}
              className={`shape-btn ${config.shape === shape ? 'active' : ''}`}
              onClick={() => updateConfig('shape', shape)}
              aria-label={shape}
            >
              <ShapeIcon shape={shape} />
              <span className="shape-name">{shape}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Material</label>
        <div className="material-options">
          {materials.map(material => (
            <button
              key={material}
              className={`material-btn ${config.material === material ? 'active' : ''}`}
              onClick={() => updateConfig('material', material)}
              style={{ background: materialSwatches[material] }}
              aria-label={material}
            >
              <span className="material-name">{material}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">
          Height <span className="height-value">{config.height}"</span>
        </label>
        <div className="height-slider-container">
          <input
            type="range"
            min="4"
            max="10"
            value={config.height}
            onChange={e => updateConfig('height', parseInt(e.target.value))}
            className="height-slider"
          />
          <div className="slider-marks">
            {[4, 5, 6, 7, 8, 9, 10].map(n => (
              <span key={n} className={`mark ${config.height === n ? 'active' : ''}`}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Pattern</label>
        <div className="pattern-options">
          {patterns.map(pattern => (
            <button
              key={pattern}
              className={`pattern-btn ${config.pattern === pattern ? 'active' : ''}`}
              onClick={() => updateConfig('pattern', pattern)}
            >
              <PatternIcon pattern={pattern} />
            </button>
          ))}
        </div>
      </div>

      <div className="control-group accent-group">
        <label className="control-label">Accent Line</label>
        <button
          className={`toggle-btn ${config.accent ? 'active' : ''}`}
          onClick={() => updateConfig('accent', !config.accent)}
          aria-pressed={config.accent}
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span className="toggle-label">{config.accent ? 'On' : 'Off'}</span>
        </button>
      </div>

      <div className="panel-footer">
        <div className="footer-deco left" />
        <span className="footer-text">Handcrafted Design</span>
        <div className="footer-deco right" />
      </div>
    </div>
  );
}

function ShapeIcon({ shape }: { shape: BookendConfig['shape'] }) {
  const paths: Record<string, string> = {
    classic: 'M4,20 L4,4 L16,4 L16,8 L8,8 L8,20 Z',
    angular: 'M4,20 L4,4 L14,4 L16,10 L16,20 L10,20 L10,10 L7,7 L7,20 Z',
    curved: 'M4,20 L4,4 Q10,2 16,4 L16,10 Q12,8 8,10 L8,20 Z',
    minimal: 'M5,20 L5,4 L15,4 L15,7 L8,7 L8,20 Z',
    ornate: 'M3,20 L3,6 Q5,4 8,4 L12,4 Q15,4 17,6 L17,10 Q14,8 11,9 L9,9 Q7,10 7,12 L7,20 Z',
  };

  return (
    <svg viewBox="0 0 20 24" className="shape-icon">
      <path d={paths[shape]} fill="currentColor" />
    </svg>
  );
}

function PatternIcon({ pattern }: { pattern: BookendConfig['pattern'] }) {
  const icons: Record<string, JSX.Element> = {
    none: <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />,
    chevron: (
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <polyline points="6,8 12,4 18,8" />
        <polyline points="6,14 12,10 18,14" />
        <polyline points="6,20 12,16 18,20" />
      </g>
    ),
    sunburst: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1="12"
              y1="12"
              x2={12 + Math.cos(rad) * 8}
              y2={12 + Math.sin(rad) * 8}
            />
          );
        })}
      </g>
    ),
    deco: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <rect x="6" y="4" width="12" height="16" />
        <line x1="6" y1="10" x2="18" y2="10" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </g>
    ),
    lines: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {[6, 10, 14, 18].map(y => (
          <line key={y} x1="4" y1={y} x2="20" y2={y} />
        ))}
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="pattern-icon">
      {icons[pattern]}
    </svg>
  );
}
