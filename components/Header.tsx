import React from 'react';
import { PaletteIcon, HistoryIcon } from './Icons';
import './Header.css';

interface HeaderProps {
  onToggleHistory: () => void;
  onGeneratePalette: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleHistory, onGeneratePalette }) => {
  return (
    <header className="app-header">
      <button
        onClick={onGeneratePalette}
        className="header-action-button"
        aria-label="Generate new palette"
      >
        <PaletteIcon className="icon" />
      </button>
      <div className="title-container">
        <h1 className="app-title">
          TEDS{' '}
          <span className="c">C</span>
          <span className="o1">O</span>
          <span className="l">L</span>
          <span className="o2">O</span>
          <span className="r">R</span>{' '}
          <span className="palettes">PALETTES</span>
        </h1>
      </div>
      <button
        onClick={onToggleHistory}
        className="header-action-button"
        aria-label="View palette history"
      >
        <HistoryIcon className="icon" />
      </button>
    </header>
  );
};

export default Header;