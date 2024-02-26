import React, { FC } from "react";
import "@components/common/styles.css";
import { useSearchParams } from "react-router-dom";
import CelebrationMain from "@components/celebration/celebration_main.component";


const CelebrationPreviewWrapper: FC = ({
}) => {
  const [searchParams] = useSearchParams();
  const recipientName = searchParams.get("recipientName");
  const customerName = searchParams.get("customerName");
  const occasion = searchParams.get("occasion");
  const relationship = searchParams.get("relationship");
  const message = searchParams.get("message");

  return (
    <CelebrationMain
      recipientName={recipientName}
      customerName={customerName}
      occasion={occasion}
      relationship={relationship}
      message={message}
    />
  );
};

export default CelebrationPreviewWrapper;
