import { ThemeColor } from "@components/common/constants";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface props {
  className?: string;
  onCountdownEnd: () => void;
  startFrom: number;
}

const CountDown = ({ className, onCountdownEnd, startFrom }: props) => {
  const [counter, setCounter] = useState<number>(startFrom);
  useEffect(() => {
    let timer: any;
    if (counter === 0) {
      onCountdownEnd();
    } else {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [counter, onCountdownEnd]);

  return (
    <div className={className}>
      <h1 className="countdown">{counter}</h1>
    </div>
  );
};
export default styled(CountDown)`
  .countdown {
    color: ${ThemeColor.ORANGE};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: anim 1s ease-in-out infinite;
  }
  @keyframes anim {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(12);
      opacity: 0;
    }
  }
`;
