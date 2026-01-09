import { useState, useCallback } from "react";

const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
    confirmText: "Aceptar",
    cancelText: "Cancelar",
  });

  const closeAlert = useCallback(() => {
    setAlertConfig(prev => ({ ...prev, show: false }));
  }, []);

  const showAlert = useCallback(
    (type, title, message, options = {}) => {
      setAlertConfig({
        show: true,
        type,
        title,
        message,
        onConfirm: options.onConfirm || closeAlert,
        onCancel: options.onCancel,
        confirmText: options.confirmText || "Aceptar",
        cancelText: options.cancelText || "Cancelar",
      });
    },
    [closeAlert]
  );

  return {
    alertConfig,
    showAlert,
    closeAlert,
  };
};

export default useAlert;