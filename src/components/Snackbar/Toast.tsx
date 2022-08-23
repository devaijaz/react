import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSnackbarPortal } from "../../hooks/usePortal";
import { Id } from "../../utils/randomid";
import styles from "./style.module.css";

export type ToastMessageType = "info" | "error" | "success" | "warning";

export type ToastImperativeHandler = {
  addToastMessage: (message: ToastMessage) => void;
};

export type ToastProps = {
  autoClose: boolean;
  timeout: number;
  addToastMessage?: () => void;
};

export type ToastMessage = {
  message: string;
  type: ToastMessageType;
};
export type ToastMessageWithId = ToastMessage & { id: string };

export type ToastInnerProps = {
  type: ToastMessage["type"];
  message: string;
  onClose: () => void;
};
const ToastInner = ({ message, type, onClose }: ToastInnerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeToast = useCallback(() => {
    onClose();
  }, []);
  const classes = useMemo(() => {
    return [styles["toast"], styles[type]].join(" ");
  }, [type]);
  return (
    <div ref={ref} className={classes} onClick={closeToast}>
      <div>{message}</div>
    </div>
  );
};

export const Toast = forwardRef(({ autoClose, timeout }: ToastProps, ref) => {
  const [toasts, setToasts] = useState<ToastMessageWithId[]>([]);
  const { elementMounted, portalId } = useSnackbarPortal();
  const [removing, setRemoving] = useState("");
  useImperativeHandle(ref, () => ({
    addToastMessage(toast: ToastMessage) {
      setToasts((toasts) => [...toasts, { ...toast, id: Id() }]);
    },
  }));
  useEffect(() => {
    if (removing) {
      removeToast(removing);
    }
  }, [removing]);
  useEffect(() => {
    if (autoClose && toasts.length) {
      setTimeout(() => {
        setRemoving(toasts[toasts.length - 1].id);
      }, timeout);
    }
  }, [toasts]);

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return elementMounted
    ? ReactDOM.createPortal(
        <div className={styles["toast-container"]}>
          {toasts.map((toast, index) => (
            <ToastInner key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id!)}></ToastInner>
          ))}
        </div>,
        document.getElementById(portalId)!
      )
    : null;
});
