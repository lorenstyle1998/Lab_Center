import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  Check,
  CircleHelp,
  MessageCircle,
  Pause,
  Play,
  Search,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { waLink, type Phone } from "@/lib/catalog";
import { useDemoInventory } from "@/lib/demo-inventory";

const features = [
  ["factoryUnlocked", "Libre de fábrica"],
  ["physicalSim", "SIM física"],
  ["esim", "eSIM"],
  ["rsim", "R-SIM"],
  ["changedParts", "Piezas cambiadas"],
  ["screen", "Pantalla"],
  ["accessories", "Accesorios"],
  ["faceId", "Face ID"],
  ["trueTone", "True Tone"],
] as const;

function OfferCard({ phone }: { phone: Phone }) {
  return (
    <article className="offer-card flex flex-col rounded-3xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{phone.storage}</span>
        {phone.tag ? (
          <span className="rounded-full bg-brand px-3 py-1 font-semibold text-accent-foreground">
            {phone.tag}
          </span>
        ) : (
          <span className="rounded-full border px-3 py-1 text-muted-foreground">
            Consultar disponibilidad
          </span>
        )}
      </div>
      <div className="phone-photo-stage my-5 flex h-52 items-center justify-center overflow-hidden rounded-2xl">
        {phone.image ? (
          <img
            src={phone.image}
            alt={`Imagen de referencia: ${phone.model}`}
            className="h-full w-full object-contain p-3"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Smartphone className="size-12" strokeWidth={1.2} />
            <span className="text-xs">Foto pendiente</span>
          </div>
        )}
      </div>
      <h3 className="font-display text-2xl font-semibold">{phone.model}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold">
          {phone.price === null ? "Consultar precio" : `$${phone.price}`}
        </span>
        {phone.oldPrice !== null && (
          <span className="text-sm text-muted-foreground line-through">${phone.oldPrice}</span>
        )}
      </div>
      <div className="my-4 flex items-center justify-between border-y py-3 text-sm">
        <span className="flex items-center gap-2">
          <Battery className="size-4 text-whatsapp" /> Batería
        </span>
        <span className="font-medium text-muted-foreground">
          {phone.condition.battery === null ? "Por confirmar" : `${phone.condition.battery}%`}
        </span>
      </div>
      <dl className="grid gap-2 text-xs">
        {features.map(([key, label]) => {
          const value = phone.condition[key];
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <dt>{label}</dt>
              <dd className="flex items-center gap-1 text-muted-foreground">
                {value === null ? (
                  <>
                    <CircleHelp className="size-3" />
                    Por confirmar
                  </>
                ) : (
                  <>
                    {value === true && <Check className="size-3 text-whatsapp" />}
                    {typeof value === "boolean" ? (value ? "Sí" : "No") : value}
                  </>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      <Button
        asChild
        className="mt-5 h-11 w-full rounded-full bg-whatsapp text-primary-foreground hover:bg-whatsapp/90"
      >
        <a
          href={waLink(
            `Hola Lab_Center, me interesa el ${phone.model} ${phone.storage}. Quiero conocer el precio y confirmar disponibilidad, batería, SIM, piezas, Face ID y True Tone.`,
          )}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" />
          Consultar por WhatsApp
        </a>
      </Button>
    </article>
  );
}

export function PhoneOffers() {
  const inventory = useDemoInventory();
  const [query, setQuery] = useState("");
  const [ref, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 45,
    dragFree: true,
  });
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const interacting = hovering || dragging || focused;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredInventory = inventory.filter((phone) =>
    `${phone.model} ${phone.storage}`.toLocaleLowerCase().includes(normalizedQuery),
  );
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    const handlePointerDown = () => setDragging(true);
    const handlePointerUp = () => setDragging(false);
    update();
    api.on("select", update);
    api.on("reInit", update);
    api.on("pointerDown", handlePointerDown);
    api.on("pointerUp", handlePointerUp);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
      api.off("pointerDown", handlePointerDown);
      api.off("pointerUp", handlePointerUp);
    };
  }, [api]);
  useEffect(() => {
    if (!api || inventory.length < 2 || !playing || interacting) return;
    const timer = window.setInterval(() => api.scrollNext(), 3500);
    return () => window.clearInterval(timer);
  }, [api, inventory.length, playing, interacting]);

  return (
    <section id="ofertas" className="scroll-mt-28 py-20" aria-label="Ofertas de iPhone">
      <div className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-end sm:justify-between md:px-10">
        <div>
          <h2 className="font-display text-4xl md:text-6xl">Ofertas</h2>
          <p className="mt-2 text-muted-foreground">Tu próximo iPhone está aquí.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? "Pausar carrusel" : "Reproducir carrusel"}
            aria-pressed={playing}
            title={playing ? "Pausar carrusel" : "Reproducir carrusel"}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            onClick={() => api?.scrollPrev()}
            disabled={filteredInventory.length < 2}
            aria-label="Anterior"
            title="Anterior"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            onClick={() => api?.scrollNext()}
            disabled={filteredInventory.length < 2}
            aria-label="Siguiente"
            title="Siguiente"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="mx-auto mb-5 flex max-w-7xl flex-col gap-2 px-5 md:px-10">
        <label className="relative block w-full max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por modelo o almacenamiento"
            aria-label="Buscar iPhone por modelo o almacenamiento"
            className="h-11 pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Limpiar búsqueda"
              title="Limpiar búsqueda"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <p className="text-xs text-muted-foreground" aria-live="polite" role="status">
          {filteredInventory.length} {filteredInventory.length === 1 ? "equipo" : "equipos"}
        </p>
      </div>
      {filteredInventory.length > 0 ? (
        <div
          ref={ref}
          className="offers-viewport overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onPointerCancelCapture={() => setDragging(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <div className="flex touch-pan-y">
            {filteredInventory.map((phone, i) => (
              <div
                key={phone.id}
                className={`offer-slide min-w-0 shrink-0 grow-0 px-3 ${selected === i ? "is-active" : i % 2 ? "tilt-right" : "tilt-left"}`}
                aria-label={`${phone.model}, ${i + 1} de ${filteredInventory.length}`}
              >
                <OfferCard phone={phone} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-5 text-center text-muted-foreground md:px-10">
          {inventory.length === 0
            ? "No hay equipos publicados por el momento. Escríbenos por WhatsApp para consultar disponibilidad."
            : "No encontramos iPhones con ese modelo o almacenamiento."}
        </div>
      )}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Disponibilidad y estado de cada equipo a confirmar por WhatsApp.
      </p>
    </section>
  );
}
