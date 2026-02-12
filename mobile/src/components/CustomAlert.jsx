import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react-native';

const CustomAlert = ({ 
  show, 
  type = 'info',
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
      strokeWidth: 2,
      color: '#FFFFFF'
    };

    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} color="#34C759" />;
      case 'error':
        return <XCircle {...iconProps} color="#FF3B30" />;
      case 'confirm':
        return <HelpCircle {...iconProps} color="#FF9500" />;
      default:
        return <AlertCircle {...iconProps} color="#0A84FF" />;
    }
  };

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel || onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <View style={styles.iconContainer}>{getIcon()}</View>
          
          {title && <Text style={styles.title}>{title}</Text>}
          
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttons}>
            {type === 'confirm' ? (
              <View style={styles.buttonsRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={{ width: 12 }} />
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.button, styles.buttonSingle, styles.confirmButton]}
                onPress={onConfirm}
              >
                <Text style={styles.confirmButtonText}>{confirmText || 'Aceptar'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#E5E5EA',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttons: {
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSingle: {
    flex: 0,
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#0A84FF',
  },
  cancelButton: {
    backgroundColor: '#3A3A3C',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomAlert;

