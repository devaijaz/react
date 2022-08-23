import React, { useContext, useRef, useState } from "react";
import { Toast, ToastImperativeHandler, ToastMessage } from "./Toast";

export enum SnackPosition {
  BottomLeft = "BottomLeft",
  TopLeft = "TopLeft",
  TopRight = "TopRight",
  BottomRight = "BottomRight",
}

export interface SnackbarParams {
  message: string;
  position?: SnackPosition;
}

const INIT_VALUE = {
  show: (params: ToastMessage) => {},
};

const SnackbarContext = React.createContext<typeof INIT_VALUE>(INIT_VALUE);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const toastRef = useRef<ToastImperativeHandler>(null);
  const show = (params: ToastMessage) => {
    toastRef.current?.addToastMessage(params);
  };

  return (
    <SnackbarContext.Provider value={{ show }}>
      <>
        {children}
        <Toast autoClose={true} timeout={3000} ref={toastRef} />
      </>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
