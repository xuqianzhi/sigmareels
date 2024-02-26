import React, { FC, useState, ReactNode } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "@components/common/constants";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import "@components/common/styles.css";
import PublishIcon from "@mui/icons-material/Publish";
import RedeemIcon from "@mui/icons-material/Redeem";

interface LandingProps {
  className?: string;
}

const OptionPaper: FC<{
  name: string;
  titleText: string;
  descriptionText: string;
  icon: ReactNode;
  onClick: () => void;
}> = ({ name, titleText, descriptionText, icon, onClick }) => {
  const [hoveringPaper, setHoverPaper] = useState<string>("");
  return (
    <Paper
      className="paper"
      onMouseEnter={() => {
        setHoverPaper(name);
      }}
      onMouseLeave={() => {
        setHoverPaper("");
      }}
      elevation={hoveringPaper === name ? 10 : 1}
      onClick={onClick}
      sx={{
        background: "red",
      }}
    >
      <Stack spacing={2}>
        <div className="icon-container">{icon}</div>
        <div className="text-wrapper" style={{ fontSize: "2vw" }}>
          {titleText}
        </div>
        <div style={{ fontSize: "1.2vw", padding: "20px" }}>
          {descriptionText}
        </div>
      </Stack>
    </Paper>
  );
};

const Landing: FC<LandingProps> = ({ className }) => {
  const navigate = useNavigate();
  const iconSize = 50;

  return (
    <div className={className}>
      <div className="center-container container">
        <Stack spacing={2}>
          <div className="center-container">
            <img
              src={process.env.PUBLIC_URL + "/logo-dark.png"}
              width="200px"
              height="200px"
            />
          </div>
          <Stack direction="row" spacing={10}>
            <OptionPaper
              name="submit"
              titleText="Submit an order"
              descriptionText="Click here if you've purchased an order, and you want to submit your customization info."
              icon={
                <PublishIcon
                  sx={{
                    width: iconSize,
                    height: iconSize,
                    color: ThemeColor.ORANGE,
                  }}
                />
              }
              onClick={() => {
                navigate("/customize");
              }}
            />
            <OptionPaper
              name="redeem"
              titleText="Redeem link look up"
              descriptionText="Click here to redeem your gift"
              icon={
                <RedeemIcon
                  sx={{
                    width: iconSize,
                    height: iconSize,
                    color: ThemeColor.ORANGE,
                  }}
                />
              }
              onClick={() => {
                navigate("/redeem");
              }}
            />
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default styled(Landing)`
  .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container {
    background: linear-gradient(
      to bottom right,
      ${ThemeColor.CREAM},
      ${ThemeColor.CREAM_END}
    );
    width: 100vw;
    height: 100vh;
  }

  .text-wrapper {
    width: 100%;
    height: auto;
    color: ${ThemeColor.ORANGE};
    overflow-wrap: break-word;
    font-size: 4vw;
    text-align: center;
  }

  .paper {
    width: 25vw;
    min-height: 40vh;
    height: auto;
    padding: 20px;
    border-radius: 15px;
    background-color: aliceblue;
    margin-top: 20px;
  }
`;
