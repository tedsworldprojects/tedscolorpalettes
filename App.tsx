import React, { useState, useEffect, useCallback } from 'react';
import { Color } from './types';
import { generateLocalPalette } from './utils/paletteGenerator';
import ColorColumn from './components/ColorColumn';
import Header from './components/Header';
import Toast from './components/Toast';
import { LoadingIcon } from './components/Icons';
import HistoryPanel from './components/HistoryPanel';
import './App.css';

const App: React.FC = () => {
  const [palette, setPalette] = useState<Color[]>([]);
  const [lockedColors, setLockedColors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [paletteHistory, setPaletteHistory] = useState<Color[][]>([]);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState<boolean>(false);

  const handleGeneratePalette = useCallback((overrideLockedColors?: string[]) => {
    setLoading(true);
    setError(null);
    try {
      if (palette.length > 0) {
        setPaletteHistory(prev => [palette, ...prev.slice(0, 9)]);
      }
      
      let colorsToLock = Array.isArray(overrideLockedColors) ? overrideLockedColors : lockedColors;

      // Sort the locked colors based on their current position in the palette
      // to ensure the first one visually becomes the new primary.
      if (!overrideLockedColors && colorsToLock.length > 1) {
          const sortedLockedColors = [...colorsToLock].sort((a, b) => {
              const indexA = palette.findIndex(c => c.hex === a);
              const indexB = palette.findIndex(c => c.hex === b);
              // if a color isn't found (shouldn't happen), keep it at the end
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;
              return indexA - indexB;
          });
          colorsToLock = sortedLockedColors;
      }
      
      const newPalette = generateLocalPalette(colorsToLock);
      setPalette(newPalette);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lockedColors, palette]);

  useEffect(() => {
    handleGeneratePalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        event.preventDefault();
        handleGeneratePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleGeneratePalette]);

  const handleToggleLock = (hex: string) => {
    setLockedColors(prev =>
      prev.includes(hex) ? prev.filter(h => h !== hex) : [...prev, hex]
    );
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleToggleHistory = () => {
    setIsHistoryPanelOpen(prev => !prev);
  };

  const handleSelectFromHistory = (selectedPalette: Color[]) => {
    setPalette(selectedPalette);
    setLockedColors([]); // Clear locks when loading from history
    setIsHistoryPanelOpen(false); // Close panel on selection
  };
  
  const handlePrimaryColorUpdate = (newHex: string) => {
    const formattedHex = newHex.startsWith('#') ? newHex : `#${newHex}`;
    setLockedColors([formattedHex]);
    handleGeneratePalette([formattedHex]);
  };

  return (
    <div className="app-container">
      <Header onToggleHistory={handleToggleHistory} onGeneratePalette={() => handleGeneratePalette()} />
      <main className="main-content">
        {loading && palette.length === 0 ? (
          <div className="loading-overlay-full">
            <LoadingIcon className="loading-icon-large animate-spin" />
            <p className="loading-text">Generating your first palette...</p>
          </div>
        ) : (
          palette.map(color => (
            <ColorColumn
              key={color.hex}
              color={color}
              isLocked={lockedColors.includes(color.hex)}
              onToggleLock={() => handleToggleLock(color.hex)}
              onCopy={() => handleCopy(color.hex)}
              onPrimaryColorUpdate={handlePrimaryColorUpdate}
            />
          ))
        )}
      </main>
      
      {loading && palette.length > 0 && (
        <div className="loading-overlay-partial">
           <LoadingIcon className="loading-icon-small animate-spin" />
        </div>
      )}

      {error && (
        <div className="error-message">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={handleToggleHistory}
        history={paletteHistory}
        onSelectPalette={handleSelectFromHistory}
      />
      
      <div className="spacebar-hint">
        Press <kbd>Spacebar</kbd> to generate a new palette
      </div>
      
      <Toast message={copiedHex ? `Copied ${copiedHex} to clipboard!` : null} />
    </div>
  );
};

export default App;