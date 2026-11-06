import { waLink } from "./catalog";

export const tradeIn = {
  acceptsIphone: true,
  paymentChannel: "whatsapp",
  message: "Hola Lab_Center, quiero entregar mi iPhone como parte del pago de otro. Mi modelo es: ",
} as const;

export const tradeInLink = () => waLink(tradeIn.message);
