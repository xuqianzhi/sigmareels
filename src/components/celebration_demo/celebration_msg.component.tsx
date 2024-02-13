import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { OpenBook } from "@components/common/svgs.component";
import { capitalizeSentence } from "@components/common/utils";
import "@components/common/styles.css";

interface CelebrationTextProps {
  className?: string;
  message: string;
  customerName: string;
}

const CelebrationText: FC<CelebrationTextProps> = ({
  className,
  message,
  customerName,
}) => {
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
      <div className="container">
        <div className="svg-wrapper">
          <OpenBook width={`${bookSize}%`} height={`${bookSize}%`} />
        </div>
        {bookSize >= 100 && (
          <div className="text-wrapper great-vibe-font">
            {capitalizeSentence(message)}
          </div>
        )}
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
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text-wrapper {
    width: 35%;
    height: auto;
    color: #ff8763; /* orange */
    overflow-wrap: break-word;
    z-index: 2;
    font-size: 4vw; 
  }

  .text-right {
    text-align: right;
  }
`;
