import React from 'react';
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react';
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
    const iconProps = {
      size: 48,
      strokeWidth: 2
    };

    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="alert-icon-success" />;
      case 'error':
        return <XCircle {...iconProps} className="alert-icon-error" />;
      case 'confirm':
        return <HelpCircle {...iconProps} className="alert-icon-confirm" />;
      default:
        return <AlertCircle {...iconProps} className="alert-icon-info" />;
    }
  };

  return (
    <div className="custom-alert-overlay">
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