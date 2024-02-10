import React, { FC, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { PlayButton } from "@components/common/svgs.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";

interface VideoIntroProps {
  className?: string;
  customerName: string;
}

const VideoIntro: FC<VideoIntroProps> = ({ className, customerName }) => {
  const { width: screenWidth, height: screenHeight } = useWindowSize();
  const [svgClass, setSvgClass] = useState<string>("spin");
  const svgSize = 200;

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
        style={{ width: `${screenWidth}px`, height: `${screenHeight}px` }}
      >
        <div className="text-and-svg-wrapper">
          <div className={svgClass}>
            <PlayButton width={`${svgSize}`} height={`${svgSize}`} />
          </div>
          <div className="text-wrapper">
            {/* Ta-da! Alongside this postcard, we've cooked up a playful video just for you. Get ready to grin from ear to ear as you dive into the celebration! */}
            <div>Wait!</div>
            <div style={{ fontSize: "45px" }}>Think That's It?</div>
            <div style={{ fontSize: "70px" }}>No No No~</div>
            <span style={{ fontSize: "50px" }}>
              <span className="great-vibe-font" style={{ fontSize: "70px" }}>{capitalizeSentence(customerName)} </span>
              <span>Cooked it Up into a</span>
            </span>
            <div>Unique Video</div>
            <div style={{ fontSize: "75px" }}>Just for You!</div>
            <div style={{ fontSize: "75px" }}>👇 👇 👇</div>
            <div style={{ fontSize: "80px" }}>Enjoy the Show!</div>
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
  .great-vibe-font {
    font-family: great-vibe;
  }

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
    background: linear-gradient(to bottom right, #b8dbfc, #f8fbfe); /* blue */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text-wrapper {
    width: 65%;
    height: auto;
    color: #ff8763; /* orange */
    font-size: 60px;
    text-align: center;
    font-family: Roboto Slab, serif;
    z-index: 2;
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
