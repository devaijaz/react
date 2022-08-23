import React, { useEffect, useState } from "react";
import { Id } from "../utils/randomid";

export type PortalParams = {
  cssClasses: Array<string>;
  styles: Record<string, string | number>;
};

export function usePortal(cssClasses: PortalParams["cssClasses"] = [], styles: PortalParams["styles"] = {}) {
  const [portalMounted, setPortalMounted] = useState(false);
  const [portalId] = React.useState(`react-portal-${Id()}`);

  useEffect(() => {
    let div = document.getElementById(portalId);
    if (!div) {
      div = document.createElement("div");
      div.classList.add(...cssClasses);
      for (const key in styles) {
        div.style.setProperty(key, styles[key].toString());
      }
      div.id = portalId;
      document.body.prepend(div);
    }
    setPortalMounted(true);
    return () => {
      document.body.removeChild(div!);
    };
  }, []);
  return { elementMounted: portalMounted, portalId };
}

export function useModalPortal() {
  return usePortal();
}

export function useSnackbarPortal() {
  return usePortal([], {
    position: "fixed",
    left: "10px",
    bottom: "10px",
  });
}
