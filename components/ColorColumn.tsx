import React, { useState } from 'react';
import { Color } from '../types';
import { getContrastingTextColor } from '../utils/color';
import { LockIcon, UnlockIcon, CopyIcon, CheckIcon } from './Icons';
import './ColorColumn.css';

interface ColorColumnProps {
  color: Color;
  isLocked: boolean;
  onToggleLock: () => void;
  onCopy: () => void;
}

const ColorColumn: React.FC<ColorColumnProps> = ({ color, isLocked, onToggleLock, onCopy }) => {
  const [justCopied, setJustCopied] = useState(false);
  const textColor = getContrastingTextColor(color.hex);

  const handleCopyClick = () => {
    onCopy();
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  };

  return (
    <div
      className="color-column"
      style={{ backgroundColor: color.hex, color: textColor }}
    >
      {color.isPrimary && (
        <div
          className="primary-label"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: textColor,
          }}
        >
          Primary
        </div>
      )}
      <div className="color-info">
        <h2 className="hex-code" onClick={handleCopyClick}>
          {color.hex}
        </h2>
        <div className="actions">
          <button
            onClick={onToggleLock}
            className="action-button"
            aria-label={isLocked ? 'Unlock color' : 'Lock color'}
          >
            {isLocked ? (
              <LockIcon className="icon" />
            ) : (
              <UnlockIcon className="icon" />
            )}
          </button>
          <button
            onClick={handleCopyClick}
            className="action-button"
            aria-label="Copy color hex code"
          >
             {justCopied ? (
              <CheckIcon className="icon icon-check" />
            ) : (
              <CopyIcon className="icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorColumn;
