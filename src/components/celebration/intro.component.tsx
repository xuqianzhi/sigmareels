import React, { FC } from "react";
import styled from "styled-components";
import { Heart } from "@components/common/svgs.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";
import { useWindowSize } from "react-use";
import { ThemeColor } from "@components/common/constants";

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
  const { width: windowWidth } = useWindowSize();
  const svgSize = windowWidth * 0.12;
  const svgClass = "heartbeat";
  return (
    <div className={className}>
      <div className="container">
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
            <div className="great-vibe-font">
              Happy {capitalizeSentence(occasion)}!
            </div>
            <div>At This Special Occasion</div>
            <span>
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
    color: ${ThemeColor.ORANGE};
    text-align: center;
    font-family: Roboto Slab, serif;
    z-index: 2;
    font-size: 5vw;
    white-space: nowrap;
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
