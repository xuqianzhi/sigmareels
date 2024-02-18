import React, { FC, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "@components/common/constants";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "@components/common/styles.css";
import RedeemIcon from "@mui/icons-material/Redeem";
import OrderIcon from "@mui/icons-material/BorderColor";
import { Button, Typography } from "@mui/material";
import {
  getCustomizationDocFromRedeemId,
  getCustomizationDocFromOrderId,
} from "@common/firestore";
import LinearProgress from "@mui/material/LinearProgress";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface RedeemProps {
  className?: string;
}

const Redeem: FC<RedeemProps> = ({ className }) => {
  const navigate = useNavigate();
  const iconSize = 50;

  const [redeemId, setRedeemId] = useState<string>("");
  const [redeemIdError, setRedeemIdError] = useState<string>();
  const [orderId, setOrderId] = useState<string>("");
  const [orderIdError, setOrderIdError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [redeemUrl, setRedeemUrl] = useState<string>("");

  const handleRedeem = async (
    value: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    requestFunc: any
  ) => {
    if (!value) return;
    setLoading(true);
    const res = await requestFunc(value);
    setLoading(false);
    if (res.data?.redeemId) {
      const url = `/redeem/${res.data.redeemId}`;
      setRedeemUrl(url);
      setOrderIdError(undefined);
      setRedeemIdError(undefined);
    } else {
      if (res.error) {
        setError(res.error);
      } else {
        setError("Sorry, but there's an unknown error occured");
      }
      setRedeemUrl(undefined);
    }
  };

  return (
    <div className={className}>
      <div className="breadcrumb-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Back
          </Link>
          <Typography color="text.primary">Redeem Link Lookup</Typography>
        </Breadcrumbs>
      </div>
      <div className="container">
        <Stack spacing={2}>
          <div className="title-text great-vibe-font heartbeat">
            Sigma Reels
          </div>
          <Stack direction="row" spacing={10}>
            <Paper className="paper" elevation={5}>
              <Stack spacing={2}>
                <div className="icon-container">
                  <OrderIcon
                    sx={{
                      width: iconSize,
                      height: iconSize,
                      color: ThemeColor.ORANGE,
                    }}
                  />
                </div>
                <Stack
                  className="content-text"
                  spacing={4}
                  style={{ fontSize: "1.8vw" }}
                >
                  <div className="sub-title-text">Use Order Id</div>
                  <TextField
                    fullWidth
                    label="Order Id"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                    }}
                  />
                  <Button
                    className="button"
                    onClick={() => {
                      handleRedeem(
                        orderId,
                        setOrderIdError,
                        getCustomizationDocFromOrderId
                      );
                    }}
                  >
                    Redeem
                  </Button>
                  {orderIdError && <Typography>{orderIdError}</Typography>}
                </Stack>
              </Stack>
            </Paper>
            <Paper className="paper" elevation={5}>
              <Stack spacing={2}>
                <div className="icon-container">
                  <RedeemIcon
                    sx={{
                      width: iconSize,
                      height: iconSize,
                      color: ThemeColor.ORANGE,
                    }}
                  />
                </div>
                <Stack
                  className="content-text"
                  spacing={4}
                  style={{ fontSize: "1.8vw" }}
                >
                  <div className="sub-title-text">Use Redeem Id</div>
                  <TextField
                    fullWidth
                    label="Redeem Id"
                    value={redeemId}
                    onChange={(e) => {
                      setRedeemId(e.target.value);
                    }}
                  />
                  <Button
                    className="button"
                    onClick={() => {
                      handleRedeem(
                        redeemId,
                        setRedeemIdError,
                        getCustomizationDocFromRedeemId
                      );
                    }}
                  >
                    Redeem
                  </Button>
                  {redeemIdError && <Typography>{redeemIdError}</Typography>}
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          {redeemUrl && (
            <Button
              className="button"
              onClick={() => {
                navigate(redeemUrl);
              }}
            >
              <span>
                <span>Your Redeem Url is: </span>
                <Link>orders.sigmareels.com{redeemUrl}</Link>
              </span>
            </Button>
          )}
          {loading && <LinearProgress />}
        </Stack>
      </div>
    </div>
  );
};

export default styled(Redeem)`
  .button {
    color: ${ThemeColor.ORANGE};
  }

  .icon-container {
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title-text {
    width: 100%;
    height: auto;
    color: ${ThemeColor.ORANGE};
    font-size: 4vw;
    text-align: center;
  }

  .sub-title-text {
    margin-top: 30px;
  }

  .content-text {
    width: 100%;
    height: auto;
    color: ${ThemeColor.ORANGE};
    font-size: 1.8vw;
  }

  .paper {
    width: 25vw;
    height: auto;
    padding: 40px;
    border-radius: 15px;
    background-color: aliceblue;
    margin-top: 20px;
  }

  .breadcrumb-container {
    position: fixed;
    top: 5px;
    left: 10px;
  }

  .heartbeat {
    animation: heartbeat 3s infinite alternate;
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
