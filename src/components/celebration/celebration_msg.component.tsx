import React, { FC, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { OpenBook } from "@components/common/svgs.component";
import ConfettiComponent from "@components/common/confetti.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";

interface CelebrationTextProps {
  className?: string;
  celebrationText: string[];
  customerName: string;
}

const CelebrationText: FC<CelebrationTextProps> = ({ 
  className,
  celebrationText,
  customerName,
 }) => {
  const { width: screenWidth, height: screenHeight } = useWindowSize();
  const [bookSize, setBookSize] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBookSize((prev) => {
        const newSize = prev + 1;
        if (newSize >= 100) {
          clearInterval(intervalId);
        }
        return newSize;
      });
    }, 5);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={className}>
      <div id='confetti-container'>
        <ConfettiComponent />
      </div>
      <div
        className="container"
        style={{ width: `${screenWidth}px`, height: `${screenHeight}px` }}
      >
        <div className="svg-wrapper">
          <OpenBook width={`${bookSize}%`} height={`${bookSize}%`} />
        </div>
        {bookSize >= 100 &&
          celebrationText.map((t, i) => (
            <div
              className="text-wrapper great-vibe-font"
              key={`book-text-${i}`}
            >
              {capitalizeSentence(t)}
            </div>
          ))}
        {bookSize >= 100 && (
          <div className="text-wrapper protest-riot-font text-right">
            {`- ${capitalizeSentence(customerName)}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default styled(CelebrationText)`
  .svg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .great-vibe-font {
    font-family: great-vibe;
  }

  .protest-riot-font {
    font-family: protest-riot;
  }

  .container {
    background: linear-gradient(to bottom right, #ff7e5f, #feb47b); /* orange */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text-wrapper {
    width: 35%;
    height: auto;
    color: #ff8763; /* orange */
    font-size: 60px;
    text-align: center;
    z-index: 2;
  }

  .text-right {
    text-align: right;
  }
`;
