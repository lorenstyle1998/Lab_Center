const phoneImage0 = { url: "/images/iphone-17-pro-max.png" };
const phoneImage1 = { url: "/images/iphone-17.png" };
const phoneImage2 = { url: "/images/iphone-16-pro.png" };
const phoneImage3 = { url: "/images/iphone-16.png" };
const phoneImage4 = { url: "/images/iphone-15-pro.png" };
const phoneImage5 = { url: "/images/iphone-15.png" };
const phoneImage6 = { url: "/images/iphone-14.png" };
const phoneImage7 = { url: "/images/iphone-13.png" };
const phoneImage8 = { url: "/images/iphone-12.png" };
const phoneImage9 = { url: "/images/iphone-11.jpg" };

// Business number with country code; waLink normalizes it for the wa.me URL.
export const WHATSAPP_NUMBER = "+5363696210";

export const waLink = (text: string) => {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export type Phone = {
  id: string;
  model: string;
  storage: string;
  price: number | null;
  oldPrice: number | null;
  tag: string | null;
  image: string;
  condition: {
    battery: number | null;
    factoryUnlocked: boolean | null;
    physicalSim: boolean | null;
    esim: boolean | null;
    rsim: boolean | null;
    changedParts: string | null;
    faceId: boolean | null;
    trueTone: boolean | null;
    screen: string | null;
    accessories: string | null;
  };
};

// Edita el estado real por equipo; null significa pendiente de confirmar.
// No se deduce compatibilidad SIM ni estado de piezas a partir del modelo.
const pendingCondition: Phone["condition"] = {
  battery: null,
  factoryUnlocked: null,
  physicalSim: null,
  esim: null,
  rsim: null,
  changedParts: null,
  faceId: null,
  trueTone: null,
  screen: null,
  accessories: null,
};

export const phones: Phone[] = [
  {
    id: "iphone-17-pro-max-256",
    model: "iPhone 17 Pro Max",
    storage: "256 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage0.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-17-256",
    model: "iPhone 17",
    storage: "256 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage1.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-16-pro-128",
    model: "iPhone 16 Pro",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage2.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-16-128",
    model: "iPhone 16",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage3.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-15-pro-128",
    model: "iPhone 15 Pro",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage4.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-15-128",
    model: "iPhone 15",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage5.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-14-128",
    model: "iPhone 14",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage6.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-13-128",
    model: "iPhone 13",
    storage: "128 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage7.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-12-64",
    model: "iPhone 12",
    storage: "64 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage8.url,
    condition: { ...pendingCondition },
  },
  {
    id: "iphone-11-64",
    model: "iPhone 11",
    storage: "64 GB",
    price: null,
    oldPrice: null,
    tag: null,
    image: phoneImage9.url,
    condition: { ...pendingCondition },
  },
];
