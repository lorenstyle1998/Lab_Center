import { describe, expect, it } from "vitest";
import { phones, waLink } from "@/lib/catalog";
import { services } from "@/lib/services";
import { parseDemoInventory } from "@/lib/demo-inventory";

describe("Estado real pendiente de confirmar", () => {
  it("no inventa el nivel de batería", () => {
    expect(phones.every((phone) => phone.condition.battery === null)).toBe(true);
  });
  it.each([
    "factoryUnlocked",
    "physicalSim",
    "esim",
    "rsim",
    "changedParts",
    "faceId",
    "trueTone",
  ] as const)("no inventa %s", (key) => {
    expect(phones.every((phone) => phone.condition[key] === null)).toBe(true);
  });
  it("no publica precios ni descuentos pendientes de confirmar", () => {
    expect(
      phones.every(
        (phone) => phone.price === null && phone.oldPrice === null && phone.tag === null,
      ),
    ).toBe(true);
  });
  it("no publica precios ni tiempos de servicio sin verificar", () => {
    expect(services.every((service) => service.price === null && service.time === null)).toBe(true);
  });
  it("genera un destino de WhatsApp con solo dígitos", () => {
    expect(new URL(waLink("Hola")).pathname).toMatch(/^\/\d+$/);
  });
  it("recupera el catálogo base si el borrador local está dañado", () => {
    expect(parseDemoInventory("inventario inválido").map((phone) => phone.id)).toEqual(
      phones.map((phone) => phone.id),
    );
  });
});
