import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Pause, Play, RefreshCw } from "lucide-react";
import { waLink } from "@/lib/catalog";
import { tradeInLink } from "@/lib/trade-in";
import { PhoneOffers } from "@/components/phone-offers";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lab_Center | Todo iPhone — Venta y reparación de iPhone" },
      {
        name: "description",
        content:
          "Ofertas de iPhone 11 al más reciente y servicio técnico especializado: diagnóstico, pantallas, baterías, SIM física y más.",
      },
      { property: "og:title", content: "Lab_Center | Todo iPhone" },
      {
        property: "og:description",
        content: "Venta de iPhone y taller especializado. Escríbenos por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target)),
        ),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [showFloatingMenu, setShowFloatingMenu] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const marquee = [
    "Diagnóstico",
    "Pantallas",
    "Baterías",
    "SIM física",
    "Microsoldadura",
    "Cámaras",
    "Garantía",
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    let savedOverride = false;

    try {
      savedOverride = window.localStorage.getItem("lab-center-motion-override") === "on";
    } catch {
      savedOverride = false;
    }

    setPrefersReducedMotion(mediaQuery.matches);
    setMotionOverride(savedOverride);
    if (savedOverride) document.documentElement.dataset["motion"] = "on";
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const toggleMotionOverride = () => {
    const nextOverride = !motionOverride;
    setMotionOverride(nextOverride);
    if (nextOverride) document.documentElement.dataset["motion"] = "on";
    else delete document.documentElement.dataset["motion"];

    try {
      window.localStorage.setItem("lab-center-motion-override", nextOverride ? "on" : "off");
    } catch {
      // The control still works for the current page if storage is unavailable.
    }
  };

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (currentScrollY <= 80) {
        setShowFloatingMenu(true);
      } else if (Math.abs(scrollDelta) > 4) {
        setShowFloatingMenu(scrollDelta < 0);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip">
      <header
        aria-hidden={!showFloatingMenu}
        inert={!showFloatingMenu}
        className={`floating-menu sticky top-3 z-20 mx-auto w-[calc(100%-24px)] max-w-7xl rounded-full border bg-background/60 transition-[transform,opacity] duration-300 ease-out ${showFloatingMenu ? "backdrop-blur-[28px] backdrop-saturate-125" : "floating-menu-hidden"}`}
      >
        <div className="floating-menu-inner flex items-center justify-between gap-2 px-4 py-3 md:px-7">
          <a href="#" className="floating-menu-brand flex items-center gap-2">
            <img src={logo} alt="Lab_Center" className="h-9 w-9" />
            <span className="font-display text-sm font-semibold sm:text-lg">
              Lab_Center{" "}
              <span className="hidden text-muted-foreground sm:inline">| Todo iPhone</span>
            </span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#ofertas" className="transition hover:text-foreground">
              Ofertas
            </a>
            <a href="#servicios" className="transition hover:text-foreground">
              Servicios
            </a>
          </nav>
          <Button
            asChild
            className="floating-menu-cta rounded-full bg-brand text-accent-foreground"
          >
            <a
              href={waLink("Hola Lab_Center, quiero información")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <ArrowUpRight />
            </a>
          </Button>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.4fr_1fr] md:px-10 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-glow" />
        <div className="reveal">
          <p className="mb-6 inline-block rounded-full border px-4 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Venta · Reparación · Garantía
          </p>
          <h1 className="hero-title font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">
            Todo para tu iPhone, <span className="text-gradient">en un solo lab.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Equipos del iPhone 11 al más reciente y un taller especializado que resuelve desde un
            diagnóstico hasta instalar SIM física.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#ofertas"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-105"
            >
              Ver ofertas
            </a>
            <a
              href="#servicios"
              className="rounded-full border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Servicios
            </a>
          </div>
        </div>
        <div className="reveal flex justify-center">
          <img
            src={logo}
            alt="Logo Lab_Center"
            className="animate-float w-52 drop-shadow-2xl sm:w-64 md:w-80"
          />
        </div>
      </section>

      <div
        className="service-marquee relative border-y py-5 pr-14 sm:pr-16"
        role="group"
        aria-label="Servicios de reparación y diagnóstico"
      >
        {prefersReducedMotion && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm sm:right-4"
            onClick={toggleMotionOverride}
            aria-label={
              motionOverride ? "Usar preferencia de movimiento del sistema" : "Activar animaciones"
            }
            title={motionOverride ? "Usar preferencia del sistema" : "Activar animaciones"}
            aria-pressed={motionOverride}
          >
            {motionOverride ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
        )}
        <div className="animate-marquee flex w-max whitespace-nowrap font-display text-2xl text-muted-foreground">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="service-marquee-group flex shrink-0 gap-12 pr-12"
              aria-hidden={copy === 1}
            >
              {marquee.map((item) => (
                <span key={item}>
                  {item} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <PhoneOffers />

      <section id="servicios" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-28 md:px-10">
        <div className="reveal mb-12 max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl">Servicios</h2>
          <p className="mt-3 text-muted-foreground">
            Técnicos especializados en iPhone, repuestos de calidad y garantía en cada trabajo.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const ServiceIcon = service.icon;
            return (
              <a
                key={service.name}
                href={waLink(`Hola Lab_Center, quiero cotizar: ${service.name}`)}
                target="_blank"
                rel="noreferrer"
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                className="reveal service-card group card-glass relative flex flex-col overflow-hidden rounded-3xl p-7 hover:shadow-glow"
              >
                <span className="service-icon-wrap" data-tone={service.tone} aria-hidden="true">
                  <ServiceIcon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-lg font-semibold text-gradient">
                    {service.price ?? "Cotizar"}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {service.time ?? "Consultar tiempo"}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="trade-in-band relative overflow-hidden border-y py-20 md:py-24">
        <div className="reveal mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.5fr_1fr] md:px-10">
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-whatsapp">
              <RefreshCw className="size-4" /> Un nuevo comienzo para tu iPhone
            </p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Tu iPhone todavía
              <br />
              tiene mucho <span className="text-gradient">valor.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Aceptamos tu iPhone como parte del pago de tu próximo equipo. Cuéntanos qué modelo
              tienes y revisamos su valor contigo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-brand text-accent-foreground"
              >
                <a href={tradeInLink()} target="_blank" rel="noreferrer">
                  Cotizar mi iPhone <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full">
                <a href="#ofertas">
                  Elegir mi próximo iPhone <ArrowUpRight />
                </a>
              </Button>
            </div>
            <div className="mt-9 border-t pt-6">
              <h3 className="font-display text-xl">¿Tu iPhone necesita atención?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                También podemos darle una segunda vida en nuestro taller.
              </p>
              <Button asChild variant="link" className="mt-2 h-auto p-0 text-foreground">
                <a
                  href={waLink("Hola Lab_Center, necesito ayuda con mi iPhone")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar reparación <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
          <div className="trade-in-art flex items-center justify-center" aria-hidden="true">
            <img src={logo} alt="" className="animate-float w-44 sm:w-56" />
            <RefreshCw
              className="trade-in-orbit absolute size-72 text-accent/20 sm:size-80"
              strokeWidth={0.6}
            />
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:px-10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="footer-logo h-6 w-6" /> Lab_Center | Todo iPhone
          </div>
          <span>
            © {new Date().getFullYear()} · Ventas y pagos únicamente vía WhatsApp Business.
          </span>
        </div>
      </footer>
    </div>
  );
}
