import React, { FC } from "react";
import CelebrationText from "@components/celebration_demo/celebration_msg.component";
import VideoIntro from "@components/celebration_demo/video_intro.component";
import Intro from "@components/celebration_demo/intro.component";
import Button from "@mui/material/Button";
import { ThemeColor } from "@components/common/constants";
import Confetti from "@components/common/confetti.component";
import useWindowSize from "react-use/lib/useWindowSize";

interface CelebrationDemoProps {
  recipientName?: string;
  customerName?: string;
  occasion?: string;
  relationship?: string;
  message?: string;
  handleGoBack?: () => void;
}

const CelebrationDemo: FC<CelebrationDemoProps> = ({
  recipientName: inputRecipientName,
  customerName: inputCustomerName,
  occasion: inputOccasion,
  relationship: inputRelationship,
  message: inputMessage,
  handleGoBack,
}) => {
  const { height: windowHeight } = useWindowSize();
  const recipientName = inputRecipientName ?? "jack";
  const customerName = inputCustomerName ?? "qianzhi";
  const occasion = inputOccasion ?? "birthday";
  const relationship = inputRelationship ?? "friend";
  const message = inputMessage ?? "happy birthday bro, you're the best, hope all is well!";

  return (
    <div>
      {handleGoBack && (
        <Button
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: ThemeColor.ORANGE_START
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
    </div>
  );
};

export default CelebrationDemo;
