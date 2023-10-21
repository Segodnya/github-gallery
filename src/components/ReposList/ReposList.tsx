import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { addRepo } from "../../redux/reposSlice";
import { Popup } from "../../components/Popup/Popup";
import { SliderSkeleton } from "../../components/Skeleton/SliderSkeleton";
import { Slider } from "../../components/Slider/Slider";
import "./ReposList.css";

export const ReposList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    api.getRepos().then((data) => {
      data.forEach((repo) => {
        dispatch(addRepo(repo));
      });
      setIsLoading(false);
    });
  }, []);

  const changePopupState = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isPopupOpen && (
        <Popup isPopupOpen={isPopupOpen} onClose={changePopupState} />
      )}
      <div className={"list-container flex-column"}>
        <div className={"list-header"}>
          ТОП ПОПУЛЯРНЫХ JAVASCRIPT РЕПОЗИТОРИЕВ
        </div>
        <>
          {isLoading && <SliderSkeleton />}
          {!isLoading && <Slider onClick={changePopupState} />}
        </>
      </div>
    </>
  );
};
