import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentRepos } from "../../redux/reposSlice";
import { getCurrentElement } from "../../redux/selectedRepoSlice";
import { PopupWrapper } from "../../components/PopupWrapper/PopupWrapper";
import { StarIcon } from "../../components/Icons/StarIcon";
import { ForkIcon } from "../../components/Icons/ForkIcon";
import { CrossIcon } from "../../components/Icons/CrossIcon";
import { LinkIcon } from "../../components/Icons/LinkIcon";
import "./Popup.css";
import "../Slider/Slider.css";
import classNames from "classnames";

interface IPopupContainerProps extends HTMLAttributes<HTMLElement> {
  isPopupOpen: boolean;
  onClose: VoidFunction;
}

export const Popup = (props: IPopupContainerProps) => {
  const repos = useSelector(getCurrentRepos);
  const currentElement = useSelector(getCurrentElement);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isPopupClosing, setIsPopupClosing] = useState(false);

  const handleClose = () => {
    setIsPopupClosing(true);
    setTimeout(props.onClose, 300);
  };

  const popupContainerClass = classNames("popup-container", {
    "popup-zoom-in": !isPopupClosing,
    "popup-zoom-out": isPopupClosing,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <PopupWrapper onClose={handleClose}>
      <div ref={popupRef} className={popupContainerClass}>
        <div className={"flex-row cross-button"}>
          <CrossIcon onClick={handleClose} />
        </div>
        <div className={"flex-row popup-content-container"}>
          <div className={"flex-column popup-content"}>
            <div className={"popup-author"}>{repos[currentElement].owner}</div>
            <div className={"popup-header"}>{repos[currentElement].name}</div>
            <div className={"popup-text"}>
              {repos[currentElement].description}
            </div>
            {repos[currentElement].url && (
              <div className={"flex-row link-block"}>
                <LinkIcon />
                <div>
                  <a className="link-item" href={repos[currentElement].url}>
                    {repos[currentElement].url}
                  </a>
                </div>
              </div>
            )}
            <div className={"flex-row topics"}>
              {repos[currentElement].topics.map((topic) => (
                <div key={topic} className={"topic"}>
                  {topic}
                </div>
              ))}
            </div>
            <div className={"flex-row"}>
              <div className={"flex-row stats-container"}>
                <StarIcon />
                <div>{repos[currentElement].stars}</div>
              </div>
              <div className={"flex-row stats-container"}>
                <ForkIcon />
                <div>{repos[currentElement].forks}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};
