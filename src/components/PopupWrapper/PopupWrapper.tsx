import React, { HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import "./PopupWrapper.css";

interface IPopupContainerProps extends HTMLAttributes<HTMLElement> {
  onClose: VoidFunction;
}

export const PopupWrapper = (props: IPopupContainerProps) => {
  return createPortal(
    <div className={"popup-wrapper"}>{props.children}</div>,
    document.getElementById("overlay") as HTMLElement
  );
};
