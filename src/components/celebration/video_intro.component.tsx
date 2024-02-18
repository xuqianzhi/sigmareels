import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { PlayButton } from "@components/common/svgs.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";
import { useWindowSize } from "react-use";
import { ThemeColor } from "@components/common/constants";

interface VideoIntroProps {
  className?: string;
  customerName: string;
}

const VideoIntro: FC<VideoIntroProps> = ({ className, customerName }) => {
  const [svgClass, setSvgClass] = useState<string>("spin");
  const { width: windowWidth } = useWindowSize();
  const svgSize = windowWidth * 0.12;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSvgClass((prev) => (prev === "spin" ? "" : "spin"));
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={className}>
      <div
        className="container"
      >
        <div className="text-and-svg-wrapper">
          <div className={svgClass}>
            <PlayButton width={`${svgSize}`} height={`${svgSize}`} />
          </div>
          <div className="text-wrapper">
            {/* Ta-da! Alongside this postcard, we've cooked up a playful video just for you. Get ready to grin from ear to ear as you dive into the celebration! */}
            <div>Wait!</div>
            <div style={{ fontSize: "3vw" }}>Think That's It?</div>
            <div>No No No~</div>
            <span style={{ fontSize: "3vw" }}>
              <span className="great-vibe-font" style={{ fontSize: "4vw" }}>{capitalizeSentence(customerName)} </span>
              <span>Cooked it Up into a</span>
            </span>
            <div style={{ fontSize: "4vw" }}>Unique Video</div>
            <div>Just for You!</div>
            <div style={{ fontSize: "4vw" }}>👇 👇 👇</div>
            <div>Enjoy the Show!</div>
          </div>
          <div className={svgClass}>
            <PlayButton width={`${svgSize}`} height={`${svgSize}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(VideoIntro)`
  .text-and-svg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .container {
    background: linear-gradient(to bottom right, #${ThemeColor.CREAM}, #${ThemeColor.CREAM_END});
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text-wrapper {
    width: 65%;
    height: auto;
    color: #ff8763; /* orange */
    text-align: center;
    font-family: Roboto Slab, serif;
    z-index: 2;
    font-size: 5vw; 
  }

  .text-right {
    text-align: right;
  }

  .spin {
    animation: spin 2s ease-in-out forwards; /* Play the animation once and then stop */
  }

  @keyframes spin {
    from {
      transform: rotate(0deg); /* Start from 0 degrees */
    }
    to {
      transform: rotate(360deg); /* Rotate to 360 degrees */
    }
  }
`;
