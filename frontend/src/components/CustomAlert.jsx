import React from 'react';
import '../styles/CustomAlert.css';

const CustomAlert = ({ 
  show, 
  type = 'info', // 'info', 'success', 'error', 'confirm'
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar'
}) => {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'confirm':
        return '❓';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="custom-alert-overlay" onClick={type !== 'confirm' ? onConfirm : null}>
      <div className="custom-alert-box" onClick={(e) => e.stopPropagation()}>
        <div className="custom-alert-icon">{getIcon()}</div>
        
        {title && <h3 className="custom-alert-title">{title}</h3>}
        
        <p className="custom-alert-message">{message}</p>
        
        <div className="custom-alert-buttons">
          {type === 'confirm' ? (
            <>
              <button 
                className="custom-alert-button cancel"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button 
                className="custom-alert-button confirm"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button 
              className="custom-alert-button confirm"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;