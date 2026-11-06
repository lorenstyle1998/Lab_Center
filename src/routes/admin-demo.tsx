import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CircleAlert, Plus, Save, Smartphone, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Phone } from "@/lib/catalog";
import { useDemoInventory, writeDemoInventory } from "@/lib/demo-inventory";

const booleanFields = [
  ["factoryUnlocked", "Libre de fábrica"],
  ["physicalSim", "SIM física"],
  ["esim", "eSIM"],
  ["rsim", "R-SIM"],
  ["faceId", "Face ID"],
  ["trueTone", "True Tone"],
] as const;

const inputClassName =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

function createDraft(): Phone {
  return {
    id: crypto.randomUUID(),
    model: "",
    storage: "",
    price: null,
    oldPrice: null,
    tag: null,
    image: "",
    condition: {
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
    },
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const Route = createFileRoute("/admin-demo")({
  head: () => ({ meta: [{ title: "Inventario demo | Lab_Center" }] }),
  beforeLoad: () => {
    if (import.meta.env.PROD) throw notFound();
  },
  component: DemoInventoryPage,
});

function DemoInventoryPage() {
  const inventory = useDemoInventory();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Phone>(createDraft);
  const [notice, setNotice] = useState("");

  const editPhone = (phone: Phone) => {
    setEditingId(phone.id);
    setDraft(phone);
    setNotice("");
  };

  const updateCondition = <Key extends keyof Phone["condition"]>(
    key: Key,
    value: Phone["condition"][Key],
  ) => {
    setDraft((current) => ({
      ...current,
      condition: { ...current.condition, [key]: value },
    }));
  };

  const savePhone = () => {
    if (!draft.model.trim() || !draft.storage.trim()) {
      setNotice("Completa modelo y almacenamiento antes de guardar.");
      return;
    }
    const updated = editingId
      ? inventory.map((phone) => (phone.id === editingId ? draft : phone))
      : [draft, ...inventory];
    try {
      writeDemoInventory(updated);
      setEditingId(draft.id);
      setNotice("Guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar en el almacenamiento de este navegador.");
    }
  };

  const removePhone = (id: string) => {
    const updated = inventory.filter((phone) => phone.id !== id);
    writeDemoInventory(updated);
    if (editingId === id) {
      setEditingId(null);
      setDraft(createDraft());
    }
    setNotice("Equipo retirado del inventario de prueba.");
  };

  const loadExample = () => {
    const existing = inventory.find(
      (phone) =>
        phone.model === "iPhone 15 Pro Max" && phone.storage === "256 GB" && phone.price === 550,
    );
    const empty = createDraft();
    setEditingId(existing?.id ?? null);
    setDraft({
      ...empty,
      id: existing?.id ?? empty.id,
      model: "iPhone 15 Pro Max",
      storage: "256 GB",
      price: 550,
      condition: {
        battery: 85,
        factoryUnlocked: null,
        physicalSim: null,
        esim: true,
        rsim: true,
        changedParts: null,
        faceId: true,
        trueTone: true,
        screen: "Reemplazada por original",
        accessories: "Cable de carga incluido",
      },
    });
    setNotice("Ejemplo cargado como borrador. Guárdalo para verlo en la tienda de este navegador.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Lab_Center
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold">Inventario de prueba</h1>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Tienda
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        <aside
          className="mb-8 flex gap-3 border border-amber-400/40 bg-amber-400/10 p-4 text-sm"
          role="alert"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
          <p>
            <strong>Prototipo local, no privado:</strong> los cambios solo se guardan en este
            navegador. No hay inicio de sesión ni sincronización con otros dispositivos. No lo uses
            como panel de producción.
          </p>
        </aside>

        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">Equipos</h2>
                <p className="text-xs text-muted-foreground">
                  {inventory.length} en este navegador
                </p>
              </div>
              <Button
                size="icon"
                variant="outline"
                aria-label="Agregar equipo"
                title="Agregar equipo"
                onClick={() => {
                  setEditingId(null);
                  setDraft(createDraft());
                  setNotice("");
                }}
              >
                <Plus aria-hidden="true" />
              </Button>
            </div>
            <div className="divide-y border-y">
              {inventory.map((phone) => (
                <div key={phone.id} className="flex items-center gap-2 py-2">
                  <button
                    type="button"
                    onClick={() => editPhone(phone)}
                    className={`min-w-0 flex-1 px-2 py-2 text-left transition-colors hover:bg-secondary ${editingId === phone.id ? "bg-secondary" : ""}`}
                  >
                    <span className="block truncate text-sm font-medium">{phone.model}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {phone.storage} ·{" "}
                      {phone.price === null ? "Precio pendiente" : `$${phone.price}`}
                    </span>
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Retirar ${phone.model}`}
                    title="Retirar del inventario"
                    onClick={() => removePhone(phone.id)}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>
              ))}
              {inventory.length === 0 && (
                <p className="py-6 text-sm text-muted-foreground">No hay equipos en esta prueba.</p>
              )}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {editingId ? "Editar equipo" : "Nuevo equipo"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deja vacío cualquier dato que aún no hayas confirmado.
                </p>
              </div>
              <Button variant="outline" onClick={loadExample}>
                Cargar ejemplo real
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Modelo">
                <input
                  className={inputClassName}
                  value={draft.model}
                  placeholder="iPhone 15 Pro Max"
                  onChange={(event) => setDraft({ ...draft, model: event.target.value })}
                />
              </Field>
              <Field label="Almacenamiento">
                <input
                  className={inputClassName}
                  value={draft.storage}
                  placeholder="256 GB"
                  onChange={(event) => setDraft({ ...draft, storage: event.target.value })}
                />
              </Field>
              <Field label="Precio (USD)">
                <input
                  className={inputClassName}
                  type="number"
                  min="0"
                  step="1"
                  value={draft.price ?? ""}
                  placeholder="Por confirmar"
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      price: event.target.value === "" ? null : Number(event.target.value),
                    })
                  }
                />
              </Field>
              <Field label="Ruta de imagen (opcional)">
                <input
                  className={inputClassName}
                  value={draft.image}
                  placeholder="/images/iphone-15-pro.png"
                  onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                />
              </Field>
              <Field label="Batería (%)">
                <input
                  className={inputClassName}
                  type="number"
                  min="0"
                  max="100"
                  value={draft.condition.battery ?? ""}
                  placeholder="Por confirmar"
                  onChange={(event) =>
                    updateCondition(
                      "battery",
                      event.target.value === "" ? null : Number(event.target.value),
                    )
                  }
                />
              </Field>
              {booleanFields.map(([key, label]) => (
                <Field key={key} label={label}>
                  <select
                    className={inputClassName}
                    value={draft.condition[key] === null ? "unknown" : String(draft.condition[key])}
                    onChange={(event) =>
                      updateCondition(
                        key,
                        event.target.value === "unknown" ? null : event.target.value === "true",
                      )
                    }
                  >
                    <option value="unknown">Por confirmar</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </Field>
              ))}
              <Field label="Pantalla / reparación">
                <input
                  className={inputClassName}
                  value={draft.condition.screen ?? ""}
                  placeholder="Reemplazada por original"
                  onChange={(event) => updateCondition("screen", event.target.value || null)}
                />
              </Field>
              <Field label="Piezas cambiadas">
                <input
                  className={inputClassName}
                  value={draft.condition.changedParts ?? ""}
                  placeholder="Por confirmar"
                  onChange={(event) => updateCondition("changedParts", event.target.value || null)}
                />
              </Field>
              <Field label="Accesorios incluidos">
                <input
                  className={inputClassName}
                  value={draft.condition.accessories ?? ""}
                  placeholder="Cable de carga incluido"
                  onChange={(event) => updateCondition("accessories", event.target.value || null)}
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
              <Button onClick={savePhone}>
                <Save aria-hidden="true" />
                Guardar en esta prueba
              </Button>
              {editingId && (
                <Button variant="outline" onClick={() => removePhone(editingId)}>
                  <Trash2 aria-hidden="true" />
                  Retirar equipo
                </Button>
              )}
              {notice && (
                <p className="text-sm text-muted-foreground" role="status">
                  {notice}
                </p>
              )}
            </div>
            <p className="mt-8 flex items-center gap-2 border-t pt-5 text-xs text-muted-foreground">
              <Smartphone className="size-4" aria-hidden="true" />
              Para ver el cambio en la tienda, guarda y vuelve a la página principal.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
