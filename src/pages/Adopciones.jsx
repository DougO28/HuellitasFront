import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import SizeSelector from "../components/SizeSelector";
import DogsGrid from "../components/DogsGrid";

export default function Adopciones() {
  const [params, setParams] = useSearchParams();
  const size = params.get("size") || "";

  const handleSelect = (val) => {
    const next = new URLSearchParams(params);
    if (val) {
      next.set("size", val);
    } else {
      next.delete("size");
    }
    setParams(next, { replace: true });
  };

  return (
    <>
      <Hero message="Puedes ver información de cada uno" />

      <section className="max-w-7xl mx-auto px-6 py-10" aria-labelledby="adopciones-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 id="adopciones-title" className="text-3xl font-bold">
            Perritos en adopción
          </h1>

          <SizeSelector value={size} onChange={handleSelect} />
        </div>

        <DogsGrid size={size} />
      </section>
    </>
  );
}
