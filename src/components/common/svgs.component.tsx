import React, { FC } from "react";
import { ThemeColor } from "@components/common/constants";

interface SvgProps {
  width: string;
  height: string;
  startColor?: string;
  stopColor?: string;
}

export const OpenBook: FC<SvgProps> = ({ width, height, startColor, stopColor }) => {
  const color1 = startColor ? startColor : ThemeColor.CREAM;
  const color2 = stopColor ? stopColor : ThemeColor.CREAM_END;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 200 200"
    >
      <path
        fill="url(#paint0_linear_105_437)"
        d="M0 45.736 50 33l50 12.736L150 33l50 12.736V168l-50-12.736L100 168l-50-12.736L0 168V45.736Z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_105_437"
          x1="100"
          x2="100"
          y1="33"
          y2="168"
          gradientUnits="userSpaceOnUse"
        >
          {/* Blue */}
          <stop stopColor={color1}></stop>
          <stop offset="1" stopColor={color2}></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export const PlayButton: FC<SvgProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 494.148 494.148"
      width={width}
      height={height}
    >
      <path
        d="M405.284 201.188 130.804 13.28C118.128 4.596 105.356 0 94.74 0 74.216 0 61.52 16.472 61.52 44.044v406.124c0 27.54 12.68 43.98 33.156 43.98 10.632 0 23.2-4.6 35.904-13.308l274.608-187.904c17.66-12.104 27.44-28.392 27.44-45.884.004-17.48-9.664-33.764-27.344-45.864z"
        fill='url("#SvgjsLinearGradient1059")'
      ></path>
      <defs>
        <linearGradient id="SvgjsLinearGradient1059">
          {/* Orange */}
          <stop stopColor="#ff7e5f" offset="0"></stop>
          <stop stopColor="#feb47b" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Heart: FC<SvgProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -28 512 512"
      x="0"
      y="0"
      width={width}
      height={height}
    >
      <path
        d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 0 0 256 455.516a30.03 30.03 0 0 0 19.785-7.43c20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0"
        fill='url("#SvgjsLinearGradient1040")'
      ></path>
      <defs>
        <linearGradient id="SvgjsLinearGradient1040">
          {/* Orange */}
          <stop stopColor="#ff7e5f" offset="0"></stop>
          <stop stopColor="#feb47b" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
