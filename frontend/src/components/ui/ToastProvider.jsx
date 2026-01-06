import React, { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

const ToastContext = createContext(null);

let idCounter = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', message = '', duration = 4000 }) => {
    const id = idCounter++;
    setToasts(t => [...t, { id, type, message }]);
    if (duration > 0) {
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  const api = {
    show: addToast,
    success: (msg, d) => addToast({ type: 'success', message: msg, duration: d }),
    error: (msg, d) => addToast({ type: 'error', message: msg, duration: d }),
    info: (msg, d) => addToast({ type: 'info', message: msg, duration: d }),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-root" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => removeToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

export default ToastProvider;
