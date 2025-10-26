import React, { useState, useEffect } from 'react';
import { Color } from '../types';
import { getContrastingTextColor } from '../utils/color';
import { LockIcon, UnlockIcon, CopyIcon, CheckIcon } from './Icons';
import './ColorColumn.css';

interface ColorColumnProps {
  color: Color;
  isLocked: boolean;
  onToggleLock: () => void;
  onCopy: () => void;
  onPrimaryColorUpdate?: (newHex: string) => void;
}

const ColorColumn: React.FC<ColorColumnProps> = ({ color, isLocked, onToggleLock, onCopy, onPrimaryColorUpdate }) => {
  const [justCopied, setJustCopied] = useState(false);
  const [editedHex, setEditedHex] = useState(color.hex);
  const textColor = getContrastingTextColor(color.hex);

  useEffect(() => {
    setEditedHex(color.hex);
  }, [color.hex]);

  const handleCopyClick = () => {
    onCopy();
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedHex(e.target.value);
  };

  const handleHexSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (/^#?([0-9A-F]{6})$/i.test(editedHex)) {
        const formattedHex = (editedHex.startsWith('#') ? editedHex : `#${editedHex}`).toUpperCase();
        if (formattedHex !== color.hex) {
          onPrimaryColorUpdate?.(formattedHex);
        }
      } else {
        setEditedHex(color.hex); // Revert on invalid format
      }
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Escape') {
      setEditedHex(color.hex);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleBlur = () => {
    // Revert to the original color if the user clicks away
    setEditedHex(color.hex);
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
        {color.isPrimary && onPrimaryColorUpdate ? (
            <input
              type="text"
              className="hex-code-input"
              value={editedHex}
              onChange={handleHexChange}
              onKeyDown={handleHexSubmit}
              onBlur={handleBlur}
              style={{ color: 'inherit' }}
              aria-label="Editable primary hex code"
            />
          ) : (
            <h2 className="hex-code" onClick={handleCopyClick}>
              {color.hex}
            </h2>
          )}
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