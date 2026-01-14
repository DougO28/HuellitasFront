import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchDogs } from "../services/dogsApi";
import DogCard from "./DogCard";

const MAX_ITEMS = 12;

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function usePerSlide() {
  const getPerSlide = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) return 3; 
    if (window.matchMedia("(min-width: 640px)").matches) return 2;  
    return 1;                                                       
  };

  const [perSlide, setPerSlide] = useState(() =>
    typeof window !== "undefined" ? getPerSlide() : 1
  );

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");

    const onChange = () => setPerSlide(getPerSlide());

    mqLg.addEventListener("change", onChange);
    mqSm.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      mqLg.removeEventListener("change", onChange);
      mqSm.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return perSlide;
}

export default function HomeDogsSlider() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const containerRef = useRef(null);

  const perSlide = usePerSlide();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchDogs({ disponible: true, pageSize: MAX_ITEMS });
      setDogs(res.data.slice(0, MAX_ITEMS));
      setLoading(false);
    })();
  }, []);

  const slides = useMemo(() => chunk(dogs, perSlide), [dogs, perSlide]);
  const totalSlides = slides.length;

  useEffect(() => {
    if (slide > totalSlides - 1) setSlide(0);
  }, [totalSlides, slide]);

  const go = (idx) => {
    const next = Math.max(0, Math.min(idx, totalSlides - 1));
    setSlide(next);
    setTimeout(() => containerRef.current?.focus(), 0);
  };
  const prev = () => go(slide - 1);
  const next = () => go(slide + 1);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">Conoce a Nuestros Perritos</h2>
        <div className="py-10 text-center">Cargando…</div>
      </section>
    );
  }

  if (!dogs.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10" aria-labelledby="home-dogs-title">
      <div className="flex items-center justify-between mb-4">
        <h2 id="home-dogs-title" className="text-3xl font-bold">
          Conoce a Nuestros Perritos
        </h2>
        <Link
          to="/adopciones"
          className="rounded-lg bg-black text-white text-sm px-4 py-2 font-medium
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Más información
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={prev}
          disabled={slide === 0}
          aria-label="Slide anterior"
          className={`absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border bg-white shadow
                      flex items-center justify-center
                      ${slide === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-neutral-50"}`}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          ref={containerRef}
          tabIndex={-1}
          className="overflow-hidden outline-none"
          aria-live="polite"
          aria-roledescription="carousel"
          aria-label="Perritos destacados"
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {slides.map((group, i) => (
              <div key={i} className="w-full shrink-0 px-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((d) => (
                    <DogCard key={d.id} d={d} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={slide === totalSlides - 1}
          aria-label="Slide siguiente"
          className={`absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border bg-white shadow
                      flex items-center justify-center
                      ${slide === totalSlides - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-neutral-50"}`}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {totalSlides > 1 && (
        <nav aria-label="Paginación del carrusel" className="mt-4 flex justify-center">
          <ul className="flex gap-3">
            {Array.from({ length: totalSlides }, (_, p) => {
              const isActive = p === slide;
              return (
                <li key={p}>
                  <button
                    type="button"
                    aria-label={`Ir al slide ${p + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => go(p)}
                    className={`w-3.5 h-3.5 rounded-full shadow
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
                                ${isActive ? "bg-neutral-600" : "bg-neutral-300 hover:bg-neutral-400"}`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </section>
  );
}