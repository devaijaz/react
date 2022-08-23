import React from "react";
import ReactDOM from "react-dom";

import { useModalPortal } from "../../hooks/usePortal";
import { ModalProps } from "./Modal.types";

import styles from "./Modal.module.css";

export const Modal = ({ children, onClose }: ModalProps) => {
  const { elementMounted, portalId } = useModalPortal();

  return elementMounted
    ? ReactDOM.createPortal(
        <>
          <div id={`overlay-${portalId}`} className={styles.overlay} onClick={onClose}></div>
          <div className={styles.modal}>
            <div className={styles["modal-body"]}>
              <header></header>
              <main>{children}</main>
            </div>
          </div>
        </>,
        document.getElementById(portalId)!
      )
    : null;
};
