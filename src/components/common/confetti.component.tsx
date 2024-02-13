import React, { FC } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ConfettiComponent: FC<{
  startFrom?: number;
  height?: number;
}> = ({ startFrom: inputStartFrom, height: inputHeight }) => {
  const { width, height: windowHeight } = useWindowSize();
  const startFrom = inputStartFrom ? inputStartFrom : 0;
  const height = inputHeight ? inputHeight : windowHeight;

  const confettiSource = {
    x: 0,
    y: startFrom,
    w: width,
    h: 0,
  };

  return (
    <div>
      <Confetti
        width={width}
        height={height}
        confettiSource={confettiSource}
        initialVelocityY={0}
      />
    </div>
  );
};

export default ConfettiComponent;
