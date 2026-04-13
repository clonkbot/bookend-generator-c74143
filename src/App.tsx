import { useState, useEffect } from 'react';
import BookendPreview from './components/BookendPreview';
import ControlPanel from './components/ControlPanel';
import './styles.css';

export interface BookendConfig {
  shape: 'classic' | 'angular' | 'curved' | 'minimal' | 'ornate';
  material: 'brass' | 'marble' | 'walnut' | 'ebony' | 'copper';
  height: number;
  pattern: 'none' | 'chevron' | 'sunburst' | 'deco' | 'lines';
  accent: boolean;
}

const defaultConfig: BookendConfig = {
  shape: 'classic',
  material: 'brass',
  height: 7,
  pattern: 'deco',
  accent: true,
};

function App() {
  const [config, setConfig] = useState<BookendConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Decorative Background */}
      <div className="background-pattern" />
      <div className="grain-overlay" />

      {/* Header */}
      <header className={`header ${isLoaded ? 'loaded' : ''}`}>
        <div className="header-ornament left" />
        <div className="header-content">
          <span className="header-subtitle">Est. 2024</span>
          <h1 className="header-title">Bookend Generator</h1>
          <span className="header-tagline">Craft Your Literary Sentinels</span>
        </div>
        <div className="header-ornament right" />
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className={`preview-section ${isLoaded ? 'loaded' : ''}`}>
          <div className="preview-label">
            <span className="label-line" />
            <span className="label-text">Preview</span>
            <span className="label-line" />
          </div>
          <BookendPreview config={config} />
          <div className="preview-specs">
            <span>Height: {config.height}"</span>
            <span className="spec-divider">◆</span>
            <span>{config.material.charAt(0).toUpperCase() + config.material.slice(1)}</span>
            <span className="spec-divider">◆</span>
            <span>{config.shape.charAt(0).toUpperCase() + config.shape.slice(1)}</span>
          </div>
        </div>

        <div className={`control-section ${isLoaded ? 'loaded' : ''}`}>
          <ControlPanel config={config} setConfig={setConfig} />
        </div>
      </main>

      {/* Footer */}
      <footer className={`footer ${isLoaded ? 'loaded' : ''}`}>
        <p className="footer-text">
          Requested by <span className="footer-handle">@web-user</span> · Built by <span className="footer-handle">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
