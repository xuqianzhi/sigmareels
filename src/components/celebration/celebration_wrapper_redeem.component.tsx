import React, { FC, useEffect, useState } from "react";
import "@components/common/styles.css";
import { useParams } from "react-router-dom";
import CelebrationMain from "@components/celebration/celebration_main.component";
import { getOrderInformation } from "@common/firestore";
import { OrderInfo } from "@common/firestore.constants";
import CircularProgress from "@mui/material/CircularProgress";

const CelebrationPreviewWrapper: FC = ({}) => {
  const { orderId } = useParams();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const [recipientName, setRecipientName] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const fetchOrder = async () => {
    setLoading(true);
    const res = await getOrderInformation(orderId);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      const data: OrderInfo = res.data;
      setRecipientName(data.recipientName);
      setCustomerName(data.customerName);
      setOccasion(data.occasion);
      setRelationship(data.relationship);
      setMessage(data.relationship);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <CelebrationMain
      error={error}
      orderId={orderId}
      recipientName={recipientName}
      customerName={customerName}
      occasion={occasion}
      relationship={relationship}
      message={message}
    />
  );
};

export default CelebrationPreviewWrapper;
