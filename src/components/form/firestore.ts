import {
  WriteOrderDocParams, ApiUrl
} from "@components/form/firestore.constants";

export const writeOrderDoc = async (
  content: WriteOrderDocParams
): Promise<boolean> => {
  const res = await fetch(ApiUrl.WRITE_ORDER_DOC, {
    method: "post",
    body: JSON.stringify(content),
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
