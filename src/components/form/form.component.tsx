import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import "@components/common/styles.css";
import TextField from "@mui/material/TextField";
import { ThemeColor } from "@components/common/constants";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import "@components/common/styles.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import { capitalizeSentence } from "@components/common/utils";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import CelebrationMain from "@components/celebration/celebration_main.component";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import {
  writeCustomizationDoc,
  verifyRedeemIdExist,
} from "@common/firestore";

interface FormProps {
  className?: string;
}

const FIELD_CHAR_LIMIT = 40;
const MSG_CHAR_LIMIT = 100;
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Form: FC<FormProps> = ({ className }) => {
  const [helpIconClassIndex, setHelpIconClassIndex] = useState<number>(0);
  const helpIconClasses = ["heartbeat", "", "", "", "", ""];
  const helpToolTipText = (
    <Typography variant="subtitle1">
      {
        "This will be what's read out loud by African Brothers, thus will be the content of the video."
      }
    </Typography>
  );

  const [orderId, setOrderId] = useState<string>("");
  const [orderIdError, setOrderIdError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [customerFirstName, setCustomerFirstName] = useState<string>("");
  const [customerFirstNameError, setCustomerFirstNameError] =
    useState<boolean>(false);

  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerLastNameError, setCustomerLastNameError] =
    useState<boolean>(false);

  const [recipientFirstName, setRecipientFirstName] = useState<string>("");
  const [recipientFirstNameError, setRecipientFirstNameError] =
    useState<boolean>(false);

  const [recipientLastName, setRecipientLastName] = useState<string>("");

  const [occasion, setOccasion] = useState<string>("");
  const [occasionError, setOccasionError] = useState<boolean>(false);

  const [relationship, setRelationship] = useState<string>("");
  const [relationshipError, setRelationshipError] = useState<boolean>(false);

  const [redeemId, setRedeemId] = useState<string>("");
  const [redeemIdError, setRedeemIdError] = useState<boolean>(false);
  const [redeemIdExistError, setRedeemIdExistError] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHelpIconClassIndex((prev) => (prev + 1) % helpIconClasses.length);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const validateRedeemId = async () => {
      if (orderId && redeemId) {
        const redeemIdExistResponse = await verifyRedeemIdExist(
          redeemId,
          orderId
        );
        if (!redeemIdExistResponse.error) {
          setRedeemIdExistError(redeemIdExistResponse.data);
        }
      }
    };
    validateRedeemId();
  }, [redeemId, orderId]);

  const shouldDisableTextField = isSubmitting;
  const shouldDisableButton = isSubmitting;

  const validateInput = (
    value: string,
    setError: (error: boolean) => void,
    charLimit?: number,
    isEmail?: boolean
  ) => {
    const emailError = isEmail ? !emailRegex.test(value) : false;
    const charCountError = charLimit
      ? !value.trim() || value.length > charLimit
      : !value.trim();

    const isError: boolean = emailError || charCountError;
    if (isError) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const validateAllInputs = (): boolean => {
    let isValid = true;

    if (!orderId.trim()) {
      setOrderIdError(true);
      isValid = false;
    } else {
      setOrderIdError(false);
    }

    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setOrderIdError(false);
    }

    if (!customerFirstName.trim()) {
      setCustomerFirstNameError(true);
      isValid = false;
    } else {
      setCustomerFirstNameError(false);
    }

    if (!customerLastName.trim()) {
      setCustomerLastNameError(true);
      isValid = false;
    } else {
      setCustomerLastNameError(false);
    }

    if (!recipientFirstName.trim()) {
      setRecipientFirstNameError(true);
      isValid = false;
    } else {
      setRecipientFirstNameError(false);
    }

    if (!occasion.trim()) {
      setOccasionError(true);
      isValid = false;
    } else {
      setOccasionError(false);
    }

    if (!relationship.trim()) {
      setRelationshipError(true);
      isValid = false;
    } else {
      setRelationshipError(false);
    }

    if (!redeemId.trim()) {
      setRedeemIdError(true);
      isValid = false;
    } else {
      setRedeemIdError(false);
    }

    if (!message.trim() || message.trim().length > MSG_CHAR_LIMIT) {
      setMessageError(true);
      isValid = false;
    } else {
      setMessageError(false);
    }

    return isValid;
  };

  const handlePreview = () => {
    if (!validateAllInputs()) return;
    setIsPreviewing(true);
  };

  const handleSubmit = async () => {
    if (!validateAllInputs()) return;
    const content = {
      orderId,
      email,
      redeemId,
      customerFirstName,
      customerLastName,
      recipientFirstName,
      recipientLastName,
      occasion,
      relationship,
      message,
    };

    setIsSubmitting(true);
    const { data: submissionSuccess, error } = await writeCustomizationDoc(
      content
    );
    setIsSubmitting(false);
    setSubmissionError(
      submissionSuccess
        ? ""
        : error ??
            `Sorry, there's an unknown error while submitting, please try
    again!`
    );
  };

  const handleGoBack = () => {
    setIsPreviewing(false);
  };

  const getRedeemIdFromInput = (value: string) => {
    const stringWithDashes = value.replace(/\s/g, "-");
    const encodedString = encodeURIComponent(stringWithDashes.trim());
    return encodedString;
  };

  const redeemIdHelperText = (): string => {
    if (!redeemId) {
      return "An custom id of your choice. This will be embedded in the link that you send your recipient.";
    } else if (redeemIdError) {
      return "Required & Cannot exceed 100 characters";
    } else if (redeemIdExistError) {
      return `The Redeem Id ${redeemId} already exist`;
    } else {
      return `An custom id of your choice. Your recipient will redeem the video gift at: orders.sigmareels.com/redeem/${redeemId}`;
    }
  };

  if (isPreviewing) {
    return (
      <CelebrationMain
        recipientName={recipientFirstName}
        customerName={customerFirstName}
        occasion={occasion}
        relationship={relationship}
        message={message}
      />
    );
  }

  return (
    <div className={className}>
      <div className="container">
        <div className="breadcrumb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Back
            </Link>
            <Typography color="text.primary">Customization Form</Typography>
          </Breadcrumbs>
        </div>
        <Stack className="form-wrapper" spacing={2} useFlexGap>
          <h2>Basic Info</h2>
          <TextField
            label="Order ID"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              validateInput(e.target.value, setOrderIdError);
            }}
            error={orderIdError}
            helperText={
              orderIdError
                ? "Required"
                : "Order Id can be found in your receipt email"
            }
            disabled={shouldDisableTextField}
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateInput(e.target.value, setEmailError, null, true);
            }}
            error={emailError}
            helperText={
              emailError
                ? "Invalid email address"
                : "Email you used for placing the order"
            }
            disabled={shouldDisableTextField}
            fullWidth
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Your First Name"
                value={customerFirstName}
                onChange={(e) => {
                  setCustomerFirstName(e.target.value);
                  validateInput(e.target.value, setCustomerFirstNameError);
                }}
                error={customerFirstNameError}
                helperText={customerFirstNameError ? "Required" : ""}
                disabled={shouldDisableTextField}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Your Last Name"
                value={customerLastName}
                onChange={(e) => {
                  setCustomerLastName(e.target.value);
                  validateInput(e.target.value, setCustomerLastNameError);
                }}
                error={customerLastNameError}
                helperText={customerLastNameError ? "Required" : ""}
                disabled={shouldDisableTextField}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Recipient First Name"
                value={recipientFirstName}
                onChange={(e) => {
                  setRecipientFirstName(e.target.value);
                  validateInput(e.target.value, setRecipientFirstNameError);
                }}
                error={recipientFirstNameError}
                helperText={recipientFirstNameError ? "Required" : ""}
                disabled={shouldDisableTextField}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Recipient Last Name"
                value={recipientLastName}
                onChange={(e) => {
                  setRecipientLastName(e.target.value);
                }}
                disabled={shouldDisableTextField}
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            label="Occasion"
            value={occasion}
            onChange={(e) => {
              setOccasion(e.target.value);
              validateInput(e.target.value, setOccasionError, FIELD_CHAR_LIMIT);
            }}
            error={occasionError}
            helperText={
              occasionError ? "Required  & Cannot exceed 100 characters" : ""
            }
            disabled={shouldDisableTextField}
            fullWidth
            required
          />
          <TextField
            label="Your relationship with recipient"
            value={relationship}
            onChange={(e) => {
              setRelationship(e.target.value);
              validateInput(e.target.value, setRelationshipError, FIELD_CHAR_LIMIT);
            }}
            error={relationshipError}
            helperText={
              relationshipError
                ? "Required  & Cannot exceed 100 characters"
                : ""
            }
            disabled={shouldDisableTextField}
            fullWidth
            required
          />
          <TextField
            label="Redeem Id"
            value={redeemId}
            onChange={(e) => {
              setRedeemId(getRedeemIdFromInput(e.target.value));
              validateInput(
                e.target.value,
                setRedeemIdError,
                MSG_CHAR_LIMIT,
                false
              );
            }}
            error={redeemIdError || redeemIdExistError}
            helperText={redeemIdHelperText()}
            disabled={shouldDisableTextField}
            fullWidth
            required
          />
          <Stack direction="row">
            <h2>What message would you like say to the recipient</h2>
            <Tooltip title={helpToolTipText} placement="right">
              <HelpOutlineIcon
                className={helpIconClasses[helpIconClassIndex]}
              />
            </Tooltip>
          </Stack>
          <TextField
            label="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              validateInput(e.target.value, setMessageError, MSG_CHAR_LIMIT);
            }}
            error={messageError}
            helperText={
              messageError ? "Required  & Cannot exceed 100 characters" : ""
            }
            disabled={shouldDisableTextField}
            fullWidth
            required
            multiline
          />
          <Button
            variant="outlined"
            onClick={handlePreview}
            disabled={shouldDisableButton}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={shouldDisableButton}
          >
            Submit
          </Button>
          <div>
            {isSubmitting && <CircularProgress />}
            {submissionError === "" && (
              <Stack direction="row" spacing={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" color="green">
                  Your info has been submitted!
                </Typography>
              </Stack>
            )}
            {submissionError && (
              <Stack direction="row" spacing={1}>
                <ErrorIcon color="error" />
                <Typography variant="h6" color="red">
                  {submissionError}
                </Typography>
              </Stack>
            )}
          </div>
          <div>
            {capitalizeSentence(
              "Note: if you submit a duplicate order id, the new submission will override the old info"
            )}
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default styled(Form)`
  .container {
    background: linear-gradient(
      to bottom right,
      ${ThemeColor.CREAM},
      ${ThemeColor.CREAM_END}
    );
    width: 100vw;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form-wrapper {
    width: 45%;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 100px;
  }

  .text-right {
    text-align: right;
  }

  .breadcrumb-container {
    position: fixed;
    top: 5px;
    left: 10px;
  }

  .heartbeat {
    animation: heartbeat 1s infinite alternate;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
`;
