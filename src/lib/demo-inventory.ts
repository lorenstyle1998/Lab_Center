import { useEffect, useState } from "react";
import { phones, type Phone } from "@/lib/catalog";

const storageKey = "lab-center-demo-inventory";
const updateEvent = "lab-center:demo-inventory-updated";

function isPhone(value: unknown): value is Phone {
  if (!value || typeof value !== "object") return false;
  const phone = value as Partial<Phone>;
  return (
    typeof phone.id === "string" &&
    typeof phone.model === "string" &&
    typeof phone.storage === "string" &&
    typeof phone.image === "string" &&
    typeof phone.condition === "object" &&
    phone.condition !== null
  );
}

export function parseDemoInventory(raw: string | null): Phone[] {
  if (!raw) return phones;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isPhone) ? parsed : phones;
  } catch {
    return phones;
  }
}

export function readDemoInventory(): Phone[] {
  try {
    return parseDemoInventory(window.localStorage.getItem(storageKey));
  } catch {
    return phones;
  }
}

export function writeDemoInventory(inventory: Phone[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(inventory));
  window.dispatchEvent(new Event(updateEvent));
}

export function useDemoInventory() {
  const [inventory, setInventory] = useState<Phone[]>(phones);

  useEffect(() => {
    const refresh = () => setInventory(readDemoInventory());
    refresh();
    window.addEventListener(updateEvent, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(updateEvent, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return inventory;
}
