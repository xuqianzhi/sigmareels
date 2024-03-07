import React, { FC, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "@components/common/constants";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "@components/common/styles.css";
import { Button, Typography } from "@mui/material";
import {
  getOrderInformation
} from "@common/firestore";
import LinearProgress from "@mui/material/LinearProgress";

interface RedeemProps {
  className?: string;
}

const Redeem: FC<RedeemProps> = ({ className }) => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string>("");
  const [orderIdError, setOrderIdError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRedeem = async () => {
    if (!orderId) return;
    setLoading(true);
    const res = await getOrderInformation(orderId);
    setLoading(false);
    if (res.error) {
      setOrderIdError(res.error);
    } else {
      setOrderIdError(undefined);
      navigate(`/redeem/${orderId}`);
    }
  };

  const textFieldHelpText = orderIdError ? orderIdError : "Your Order Id can be found in the email address";

  return (
    <div className={className}>
      <div className="container center-container">
        <Stack spacing={2}>
          <div className="center-container">
            <img
              src={process.env.PUBLIC_URL + "/logo-dark.png"}
              width="200px"
              height="200px"
            />
          </div>
          <Stack direction="row" spacing={10}>
            <Paper className="paper" elevation={5}>
              <Stack spacing={2}>
                <Stack
                  className="content-text"
                  spacing={4}
                  style={{ fontSize: "1.8vw" }}
                >
                  <TextField
                    fullWidth
                    label="Order Id"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                    }}
                    error={!!orderIdError}
                    helperText={textFieldHelpText}
                  />
                  <Button
                    className="button"
                    onClick={handleRedeem}
                  >
                    Redeem
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
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
`;
