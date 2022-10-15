import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useRef } from "react";
import backVideo1 from "../content/racingcars.mp4";
import "../css/BackGroundVideos.css";

export default function BackGroundVideos() {
  let vidRef = useRef();
  const randomsrc = [{ backVideo1 }];
  useEffect(() => {
    const interval = setInterval(() => {
      vidRef.current.src = backVideo1;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="videocontainer">
      <video width="100%" preload="auto" autoPlay muted>
        <source src={backVideo1} ref={vidRef} imgtype="video/mp4" />
      </video>
    </div>
  );
}
