import React, { FC, useEffect, useState } from "react";
import CelebrationText from "@components/celebration/celebration_msg.component";
import VideoIntro from "@components/celebration/video_intro.component";
import Intro from "@components/celebration/intro.component";
import Button from "@mui/material/Button";
import { ThemeColor } from "@components/common/constants";
import Confetti from "@components/common/confetti.component";
import useWindowSize from "react-use/lib/useWindowSize";
import VideoPlayer from "@components/celebration/video_player.component";
import { useParams } from "react-router-dom";
import { getCustomizationDocFromRedeemId } from "@common/firestore";
import { CustomizationDoc } from "@common/firestore.constants";
import styled from "styled-components";
import "@components/common/styles.css";

interface CelebrationMainProps {
  className?: string;
  orderId?: string;
  error?: string;
  recipientName: string;
  customerName: string;
  occasion: string;
  relationship: string;
  message: string;
}

const CelebrationMain: FC<CelebrationMainProps> = ({
  className,
  recipientName,
  customerName,
  occasion,
  relationship,
  message,
  orderId,
  error,
}) => {
  const { height: windowHeight } = useWindowSize();

  return (
    <div className={className}>
      {!error && (
        <>
          <Confetti startFrom={0} height={windowHeight * 2} />
          <Intro
            recipientName={recipientName}
            customerName={customerName}
            occasion={occasion}
            relationship={relationship}
          />
          <CelebrationText message={message} customerName={customerName} />
          <VideoIntro customerName={customerName} />
          <VideoPlayer orderId={orderId} />
        </>
      )}
      {error && (
        <>
          <div className="main-container">
            <div
              className="error-text-wrapper protest-riot-font"
              style={{ fontSize: "3vw" }}
            >
              <div>Unfortunately, something went wrong</div>
              <div>We apologize for the inconvenience</div>
              <div>Please try again later</div>
              <div>Thanks!</div>
              <div>Error: {error}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default styled(CelebrationMain)`
  .main-container {
    background: linear-gradient(
      to bottom right,
      ${ThemeColor.CREAM},
      ${ThemeColor.CREAM_END}
    );
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .error-text-wrapper {
    width: 65%;
    height: auto;
    color: black;
    overflow-wrap: break-word;
    font-size: 8vw;
    text-align: center;
  }
`;
