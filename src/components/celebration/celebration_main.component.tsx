import React from "react";
import CelebrationText from "@components/celebration/celebration_msg.component";
import VideoIntro from "@components/celebration/video_intro.component";
import Intro from "@components/celebration/intro.component";

const CelebrationMain = () => {
  const recipientName = "jack";
  const customerName = "qianzhi";
  const occasion = "birthday";
  const relationship = "friend";
  const celebrationText = [
    "happy birthday bro",
    "you're the best",
    "hope all is well",
  ];

  return (
    <div>
      <Intro
        recipientName={recipientName}
        customerName={customerName}
        occasion={occasion}
        relationship={relationship}
      />
      <CelebrationText
        celebrationText={celebrationText}
        customerName={customerName}
      />
      <VideoIntro customerName={customerName} />
    </div>
  );
};

export default CelebrationMain;
