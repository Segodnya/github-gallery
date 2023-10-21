import React, { HTMLAttributes, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentRepos } from "../../redux/reposSlice";
import {
  decrement,
  getCurrentElement,
  increment,
} from "../../redux/selectedRepoSlice";
import { ArrowLeftIcon } from "../Icons/ArrowLeftIcon";
import { StarIcon } from "../Icons/StarIcon";
import { ForkIcon } from "../Icons/ForkIcon";
import { ArrowRightIcon } from "../Icons/ArrowRightIcon";
import "./Slider.css";

interface ISliderProps extends HTMLAttributes<HTMLElement> {
  onClick: VoidFunction;
}

export const Slider = (props: ISliderProps) => {
  const dispatch = useDispatch();
  const repos = useSelector(getCurrentRepos);
  const currentElement = useSelector(getCurrentElement);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const [swipeDistance, setSwipeDistance] = useState(0);

  const handleSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    const { clientX } = event;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;

    if (sliderWidth === 0) return;

    if (event.type === "pointerdown") {
      touchStartX.current = clientX;
      event.preventDefault();
    } else if (event.type === "pointerup") {
      const touchEndX = clientX;
      const newSwipeDistance = touchEndX - touchStartX.current;
      const minSwipeDistance = sliderWidth / 2;

      if (newSwipeDistance >= minSwipeDistance) {
        dispatch(decrement());
        setSwipeDistance(0);
      } else if (newSwipeDistance <= -minSwipeDistance) {
        dispatch(increment());
        setSwipeDistance(0);
      } else {
        setSwipeDistance(newSwipeDistance);
      }
    } else if (event.type === "pointermove") {
      if (event.buttons === 1) {
        setSwipeDistance(clientX - touchStartX.current);
      }
    }
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const touchEndX = event.clientX;
    const clickDistance = touchEndX - touchStartX.current;
    const offsetWidth = sliderRef.current?.offsetWidth;

    if (offsetWidth && Math.abs(clickDistance) < offsetWidth / 2) {
      props.onClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      dispatch(decrement());
    } else if (event.key === "ArrowRight") {
      dispatch(increment());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={"flex-row slider-container"}
      ref={sliderRef}
      tabIndex={0}
      onPointerDown={handleSwipe}
      onPointerUp={handleSwipe}
      onPointerMove={handleSwipe}
    >
      <div
        className={"flex-column slider-button"}
        onClick={() => dispatch(decrement())}
      >
        <ArrowLeftIcon />
      </div>
      <div
        className={"flex-column slider-content"}
        onClick={handleContentClick}
        style={{ transform: `translateX(${swipeDistance}px)` }}
      >
        <div className={"slider-header"}>{repos[currentElement].name}</div>
        <div className={"slider-text"}>{repos[currentElement].description}</div>
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
      <div
        className={"flex-column slider-button"}
        onClick={() => dispatch(increment())}
      >
        <ArrowRightIcon />
      </div>
    </div>
  );
};
