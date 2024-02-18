import React, { FC, useEffect, useState } from "react";
import CelebrationText from "@components/celebration/celebration_msg.component";
import VideoIntro from "@components/celebration/video_intro.component";
import Intro from "@components/celebration/intro.component";
import Button from "@mui/material/Button";
import { ThemeColor } from "@components/common/constants";
import Confetti from "@components/common/confetti.component";
import useWindowSize from "react-use/lib/useWindowSize";
import VideoPlayer from "@components/celebration/video_player.component";
import { useParams } from "react-router-dom";
import { getCustomizationDocFromRedeemId } from "@common/firestore";
import { CustomizationDoc } from "@common/firestore.constants";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import "@components/common/styles.css";

interface CelebrationMainProps {
  className?: string;
  recipientName?: string;
  customerName?: string;
  occasion?: string;
  relationship?: string;
  message?: string;
  handleGoBack?: () => void;
}

const CelebrationMain: FC<CelebrationMainProps> = ({
  className,
  recipientName: inputRecipientName,
  customerName: inputCustomerName,
  occasion: inputOccasion,
  relationship: inputRelationship,
  message: inputMessage,
  handleGoBack,
}) => {
  const { redeemId } = useParams();

  const [orderId, setOrderId] = useState<string>();
  const [recipientName, setRecipientName] = useState<string>();
  const [customerName, setCustomerName] = useState<string>();
  const [occasion, setOccasion] = useState<string>();
  const [relationship, setRelationship] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const fetchCustomizationDoc = async (redeemId: string) => {
    setLoading(true);
    const doc = await getCustomizationDocFromRedeemId(redeemId);
    setLoading(false);
    if (doc.error) {
      setError(doc.error);
      return;
    }
    const data = doc.data as CustomizationDoc;
    setOrderId(data.orderId);
    setRecipientName(data.recipientFirstName);
    setCustomerName(data.customerFirstName);
    setOccasion(data.occasion);
    setRelationship(data.relationship);
    setMessage(data.relationship);
  };

  useEffect(() => {
    if (redeemId) {
      fetchCustomizationDoc(redeemId);
    } else {
      setLoading(true);
      setRecipientName(inputRecipientName ?? "ReeSiPoo");
      setCustomerName(inputCustomerName ?? "jack");
      setOccasion(inputOccasion ?? "birthday");
      setRelationship(inputRelationship ?? "friend");
      setMessage(
        inputMessage ?? "happy birthday bro, you're the best, hope all is well!"
      );
      setLoading(false);
    }
  }, [
    redeemId,
    inputRecipientName,
    inputCustomerName,
    inputOccasion,
    inputRelationship,
    inputMessage,
  ]);

  const { height: windowHeight } = useWindowSize();

  return (
    <div className={className}>
      {loading && (
        <div className="container">
          <CircularProgress sx={{ color: ThemeColor.ORANGE }} />
        </div>
      )}
      {!loading && !error && (
        <>
          {handleGoBack && (
            <Button
              sx={{
                position: "fixed",
                top: 20,
                left: 20,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: ThemeColor.ORANGE,
              }}
              variant="contained"
              onClick={handleGoBack}
            >
              Back to form
            </Button>
          )}
          <Confetti startFrom={0} height={windowHeight * 2} />
          <Intro
            recipientName={recipientName}
            customerName={customerName}
            occasion={occasion}
            relationship={relationship}
          />
          <CelebrationText message={message} customerName={customerName} />
          <VideoIntro customerName={customerName} />
          <VideoPlayer orderId={orderId} />
        </>
      )}
      {!loading && error && (
        <>
          <div className="main-container">
            <div
              className="error-text-wrapper protest-riot-font"
              style={{ fontSize: "3vw" }}
            >
              <div>
                Unfortunately, something went wrong
              </div>
              <div>We apologize for the inconvenience</div>
              <div>Please try again later</div>
              <div>Thanks!</div>
              <div>Error: {error}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default styled(CelebrationMain)`
  .main-container {
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

  .error-text-wrapper {
    width: 65%;
    height: auto;
    color: black;
    overflow-wrap: break-word;
    font-size: 8vw;
    text-align: center;
  }
`;
