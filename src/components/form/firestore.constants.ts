export enum Colleciton {
    ORDERS = "orders"
}

export enum ApiUrl {
    WRITE_ORDER_DOC = "https://us-central1-sigmareels-88.cloudfunctions.net/writeOrderDoc"
}

export interface WriteOrderDocParams {
    orderId: string;
    email: string;
    customerFirstName: string;
    customerLastName: string;
    recipientFirstName: string;
    recipientLastName: string;
    occasion: string;
    relationship: string;
    message: string;
}