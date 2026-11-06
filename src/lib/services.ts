import {
  BatteryCharging,
  Cable,
  Camera,
  Cpu,
  Droplets,
  Layers,
  RefreshCw,
  ScanSearch,
  Signal,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ✏️ EDITA AQUÍ LOS PRECIOS DE LOS SERVICIOS.
// "price" acepta texto libre: "$25", "desde $40", "Cotizar", etc.
export type Service = {
  name: string;
  description: string;
  price: string | null;
  time: string | null;
  icon: LucideIcon;
  tone: "cyan" | "blue" | "green" | "amber" | "rose" | "violet";
};

export const services: Service[] = [
  {
    icon: ScanSearch,
    tone: "cyan",
    name: "Diagnóstico completo",
    description: "Revisión de hardware y software para detectar cualquier falla.",
    price: null,
    time: null,
  },
  {
    icon: Smartphone,
    tone: "blue",
    name: "Cambio de pantalla",
    description: "Pantallas OLED / LCD de alta calidad con garantía.",
    price: null,
    time: null,
  },
  {
    icon: BatteryCharging,
    tone: "green",
    name: "Cambio de batería",
    description: "Recupera la autonomía y la salud de batería al 100%.",
    price: null,
    time: null,
  },
  {
    icon: Signal,
    tone: "cyan",
    name: "Instalación de SIM física",
    description: "Adaptamos bandeja SIM en iPhone que solo traen eSIM.",
    price: null,
    time: null,
  },
  {
    icon: Cable,
    tone: "amber",
    name: "Puerto de carga",
    description: "Limpieza o reemplazo del conector Lightning / USB‑C.",
    price: null,
    time: null,
  },
  {
    icon: Camera,
    tone: "blue",
    name: "Cámaras",
    description: "Reparación de cámara trasera, frontal y lente.",
    price: null,
    time: null,
  },
  {
    icon: Layers,
    tone: "rose",
    name: "Tapa trasera",
    description: "Cambio de cristal trasero con láser de precisión.",
    price: null,
    time: null,
  },
  {
    icon: Droplets,
    tone: "blue",
    name: "Daño por líquido",
    description: "Limpieza ultrasónica y recuperación de placa.",
    price: null,
    time: null,
  },
  {
    icon: Cpu,
    tone: "violet",
    name: "Microsoldadura de placa",
    description: "Reparación a nivel de componente: Face ID, audio, encendido.",
    price: null,
    time: null,
  },
  {
    icon: RefreshCw,
    tone: "green",
    name: "Software y respaldo",
    description: "Actualización, restauración y transferencia de datos.",
    price: null,
    time: null,
  },
];
