import React from 'react';
import { Color } from '../types';
import { CloseIcon } from './Icons';
import './HistoryPanel.css';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: Color[][];
  onSelectPalette: (palette: Color[]) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onSelectPalette }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`history-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Panel */}
      <aside
        className={`history-panel ${isOpen ? 'open' : ''}`}
      >
        <div className="panel-header">
          <h2 className="panel-title">History</h2>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close history panel"
          >
            <CloseIcon className="icon" />
          </button>
        </div>
        <div className="panel-content">
          {history.length === 0 ? (
            <p className="empty-history">
              No history yet. Press the spacebar to generate palettes!
            </p>
          ) : (
            <ul className="history-list">
              {history.map((palette, index) => (
                <li
                  key={index}
                  onClick={() => onSelectPalette(palette)}
                  className="history-item"
                >
                  <div className="palette-preview">
                    {palette.map((color) => (
                      <div
                        key={color.hex}
                        className="palette-swatch"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default HistoryPanel;
