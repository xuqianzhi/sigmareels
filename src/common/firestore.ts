import { CustomizationDoc, ApiUrl } from "@common/firestore.constants";

export interface FirestoreResponse {
  data: any;
  error: string | null;
}

export const writeCustomizationDoc = async (
  content: CustomizationDoc
): Promise<FirestoreResponse> => {
  const res = await fetch(ApiUrl.writeCustomizationDoc(), {
    method: "post",
    body: JSON.stringify(content),
  });
  const resJson = await res.json();
  if (res.status === 200) {
    return {
      data: true,
      error: null,
    };
  } else {
    return {
      data: false,
      error: resJson.error,
    };
  }
};

export const verifyRedeemIdExist = async (
  redeemId: string,
  orderId?: string
): Promise<FirestoreResponse> => {
  const res = await fetch(ApiUrl.verifyRedeemIdExist(redeemId, orderId), {
    method: "get",
  });
  const resJson = await res.json();
  if (res.status === 200) {
    const data = resJson.data;
    return {
      data: data,
      error: null,
    };
  }
  return {
    data: null,
    error: resJson.error,
  };
};

export const getCustomizationDocFromRedeemId = async (
  redeemId: string
): Promise<FirestoreResponse> => {
  const res = await fetch(ApiUrl.getCustomizationDocFromRedeemId(redeemId), {
    method: "get",
  });
  const resJson = await res.json();
  if (res.status === 200) {
    const data = resJson.data;
    return {
      data: {
        orderId: data.orderId,
        email: data.email,
        redeemId: data.redeemId,
        customerFirstName: data.customerFirstName,
        customerLastName: data.customerLastName,
        recipientFirstName: data.recipientFirstName,
        recipientLastName: data.recipientLastName,
        occasion: data.occasion,
        relationship: data.relationship,
        message: data.message,
      },
      error: null,
    };
  }
  return {
    data: null,
    error: resJson.error,
  };
};

export const getCustomizationDocFromOrderId = async (
  orderId: string
): Promise<FirestoreResponse> => {
  const res = await fetch(ApiUrl.getCustomizationDocFromOrderId(orderId), {
    method: "get",
  });
  const resJson = await res.json();
  if (res.status === 200) {
    const data = resJson.data;
    return {
      data: {
        orderId: data.orderId,
        email: data.email,
        redeemId: data.redeemId,
        customerFirstName: data.customerFirstName,
        customerLastName: data.customerLastName,
        recipientFirstName: data.recipientFirstName,
        recipientLastName: data.recipientLastName,
        occasion: data.occasion,
        relationship: data.relationship,
        message: data.message,
      },
      error: null,
    };
  }
  return {
    data: null,
    error: resJson.error,
  };
};

export const getVideoDownloadUrl = async (
  orderId?: string
): Promise<FirestoreResponse> => {
  const res = await fetch(ApiUrl.getVideoDownloadUrl(orderId), {
    method: "get",
  });
  const resJson = await res.json();
  if (res.status === 200) {
    return {
      data: resJson.data,
      error: null,
    };
  }
  return {
    data: null,
    error: resJson.error,
  };
};
