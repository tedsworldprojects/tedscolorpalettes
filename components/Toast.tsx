
import React, { useState, useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1900);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <div
      className={`toast ${visible ? 'visible' : ''}`}
    >
      {message}
    </div>
  );
};

export default Toast;
