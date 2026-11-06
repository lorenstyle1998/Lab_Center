import { describe, expect, it } from "vitest";
import { tradeIn, tradeInLink } from "@/lib/trade-in";

describe("iPhone como parte de pago", () => {
  it("acepta iPhones como parte de pago", () => {
    expect(tradeIn.acceptsIphone).toBe(true);
  });
  it("mantiene la negociación y el pago en WhatsApp", () => {
    expect(tradeIn.paymentChannel).toBe("whatsapp");
    expect(new URL(tradeInLink()).hostname).toBe("wa.me");
  });
});
