import React, { FC, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ConfettiComponent: FC = () => {
  const { width, height } = useWindowSize();
  const [startFrom, setStartFrom] = useState<number>(0);
  const confettiSource = {
    x: 0,
    y: startFrom,
    w: width,
    h: 0,
  };

  useEffect(() => {
    const parentDiv = document.getElementById("confetti-container");
    setStartFrom(parentDiv ? parentDiv.getBoundingClientRect().y : 0);
  }, [document.getElementById("confetti-container")])

  return (
    <div>
      <Confetti
        width={width}
        height={height * 2}
        confettiSource={confettiSource}
        initialVelocityY={0}
      />
    </div>
  );
};

export default ConfettiComponent;
