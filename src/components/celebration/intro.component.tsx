import React, { FC } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { Heart } from "@components/common/svgs.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";

interface IntroProps {
  className?: string;
  recipientName: string;
  customerName: string;
  occasion: string;
  relationship: string;
}

const Intro: FC<IntroProps> = ({
  className,
  recipientName,
  customerName,
  occasion,
  relationship,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowSize();
  const svgSize = 200;
  const svgClass = "heartbeat";
  return (
    <div className={className}>
      <div
        className="container"
        style={{ width: `${screenWidth}px`, height: `${screenHeight}px` }}
      >
        <div className="text-and-svg-wrapper">
          <div className={svgClass}>
            <Heart width={`${svgSize}`} height={`${svgSize}`} />
          </div>
          <div className="text-wrapper">
            <span>
              <span>Hey </span>
              <span className="great-vibe-font">
                {capitalizeSentence(recipientName)}!
              </span>
            </span>
            <div className="great-vibe-font" style={{ fontSize: "80px" }}>
              Happy {capitalizeSentence(occasion)}!
            </div>
            <div>At This Special Occasion</div>
            <span style={{ fontSize: "70px" }}>
              <span>Your Dear {capitalizeSentence(relationship)} </span>
              <span className="great-vibe-font">
                {capitalizeSentence(customerName)}
              </span>
            </span>
            <div>Have Some Kind Words to Say</div>
          </div>
          <div className={svgClass}>
            <Heart width={`${svgSize}`} height={`${svgSize}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(Intro)`
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

  .heartbeat {
    animation: heartbeat 1s infinite alternate;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
