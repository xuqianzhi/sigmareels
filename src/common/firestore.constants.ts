export enum Colleciton {
  ORDERS = "orders",
}

const getFilteredUrlSearchParam = (
  inputParams: Record<string, string>
): string => {
  const filteredParams = Object.entries(inputParams)
    .filter(([key, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc.append(key, value!); // Using ! to assert that value is not undefined
      return acc;
    }, new URLSearchParams());
  return filteredParams.toString().length === 0
    ? ""
    : `?${filteredParams.toString()}`;
};

export const ApiUrl = {
  getCustomizationDocFromOrderId: (orderId: string) =>
    `https://us-central1-sigmareels-88.cloudfunctions.net/getCustomizationDocFromOrderId?${new URLSearchParams(
      { orderId: orderId }
    )}`,
  getCustomizationDocFromRedeemId: (redeemId: string) =>
    `https://us-central1-sigmareels-88.cloudfunctions.net/getCustomizationDocFromRedeemId?${new URLSearchParams(
      { redeemId: redeemId }
    )}`,
  verifyRedeemIdExist: (redeemId: string, orderId?: string) =>
    `https://us-central1-sigmareels-88.cloudfunctions.net/verifyRedeemIdExist${getFilteredUrlSearchParam({ redeemId: redeemId, orderId: orderId })}`,
  writeCustomizationDoc: () =>
    "https://us-central1-sigmareels-88.cloudfunctions.net/writeCustomizationDoc",
  getVideoDownloadUrl: (orderId?: string) =>
    `https://us-central1-sigmareels-88.cloudfunctions.net/getVideoDownloadUrl${getFilteredUrlSearchParam(
      { orderId: orderId }
    )}`,
  getOrderInformation: (orderId?: string) =>
    `https://us-central1-sigmareels-88.cloudfunctions.net/getOrderInformation${getFilteredUrlSearchParam(
      { orderId: orderId }
    )}`,
};

export interface CustomizationDoc {
  orderId: string;
  email: string;
  redeemId: string;
  customerFirstName: string;
  customerLastName: string;
  recipientFirstName: string;
  recipientLastName?: string;
  occasion: string;
  relationship: string;
  message: string;
}

export interface OrderInfo {
  id: string;
  customerName: string;
  recipientName: string;
  occasion: string;
  relationship: string;
  message: string;
  imageUrl?: string;
  marketingPermission: boolean;
}
