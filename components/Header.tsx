import React from 'react';
import { PaletteIcon, HistoryIcon } from './Icons';
import './Header.css';

interface HeaderProps {
  onToggleHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleHistory }) => {
  return (
    <header className="app-header">
      <div className="title-container">
        <PaletteIcon className="header-icon" />
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
        className="history-button"
        aria-label="View palette history"
      >
        <HistoryIcon className="icon" />
      </button>
    </header>
  );
};

export default Header;
