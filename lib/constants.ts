export const WHATSAPP_NUMBER = '66933880630';
export const WHATSAPP_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hi, I'm interested in LandWise services for my land on Ko Pha Ngan.";

export const getWhatsAppLink = (customMessage?: string) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};
