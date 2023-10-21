import React from "react";
import classNames from "classnames";
import { ArrowLeftIcon } from "../Icons/ArrowLeftIcon";
import { StarIcon } from "../Icons/StarIcon";
import { ForkIcon } from "../Icons/ForkIcon";
import { ArrowRightIcon } from "../Icons/ArrowRightIcon";
import "./SliderSkeleton.css";
import "../Slider/Slider.css";

export const SliderSkeleton = () => {
  return (
    <div className={classNames("flex-row", "slider-container")}>
      <div className={classNames("flex-column", "slider-button")}>
        <ArrowLeftIcon />
      </div>
      <div className={classNames("flex-column", "slider-content")}>
        <div className={"slider-skeleton-header"} />
        <div className={"slider-skeleton-text"} />
        <div className={"slider-skeleton-text"} />
        <div style={{ marginTop: "8px" }} className={classNames("flex-row")}>
          <div
            className={classNames(
              "flex-row",
              "stats-container",
              "slider-skeleton-stats-container"
            )}
          >
            <StarIcon />
            <div className={"slider-skeleton-text"} />
          </div>
          <div
            className={classNames(
              "flex-row",
              "stats-container",
              "slider-skeleton-stats-container"
            )}
          >
            <ForkIcon />
            <div className={"slider-skeleton-text"} />
          </div>
        </div>
      </div>
      <div className={classNames("flex-column", "slider-button")}>
        <ArrowRightIcon />
      </div>
    </div>
  );
};
