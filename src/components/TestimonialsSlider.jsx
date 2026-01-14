import { useEffect, useMemo, useRef, useState } from "react";
import { fetchTestimonials } from "../services/testimonialsApi";

export default function TestimonialsSlider() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchTestimonials();
      setItems(res.data);
      setLoading(false);
    })();
  }, []);

  const totalSlides = useMemo(() => items.length, [items]);

  // Auto-play: cambiar automáticamente cada 5 segundos
  useEffect(() => {
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [totalSlides]);

  const go = (idx) => {
    if (!totalSlides) return;
    // Hacer que el slider sea circular/infinito
    let next = idx;
    if (idx < 0) {
      next = totalSlides - 1; // Si va hacia atrás desde 0, ir al último
    } else if (idx >= totalSlides) {
      next = 0; // Si va hacia adelante desde el último, ir al primero
    }
    setSlide(next);
    setTimeout(() => containerRef.current?.focus(), 0);
  };

  const prev = () => go(slide - 1);
  const next = () => go(slide + 1);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Testimonios</h2>
        <div className="text-center py-10">Cargando testimonios...</div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Testimonios</h2>
        <div className="text-center py-10 text-neutral-600">
          Aún no hay testimonios disponibles.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className="text-3xl font-bold mb-6">
        Testimonios
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={prev}
          aria-label="Testimonio anterior"
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border bg-white shadow flex items-center justify-center hover:bg-neutral-50"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          ref={containerRef}
          tabIndex={-1}
          className="overflow-hidden outline-none pb-10"
          aria-roledescription="carousel"
          aria-label="Slider de testimonios"
          aria-live="polite"
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {items.map((t) => (
              <div key={t.id} className="w-full shrink-0 px-2">
                <article className="rounded-xl bg-neutral-50 shadow-md shadow-gray-400 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-hidden">
                    <div className="w-full h-full md:h-full aspect-[4/3] md:aspect-auto bg-neutral-200">
                      {t.imagen ? (
                        <img
                          src={t.imagen}
                          alt={t.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-500">
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col items-start justify-center">
                    <h3 className="text-2xl font-semibold mb-3">{t.titulo}</h3>
                    <p className="text-neutral-700 leading-relaxed mb-4">
                      {t.descripcion}
                    </p>
                    {t.nombreAdoptante && (
                      <p className="text-sm text-neutral-600 font-medium">
                        - {t.nombreAdoptante}
                        {t.nombreMascota && ` con ${t.nombreMascota}`}
                      </p>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente testimonio"
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border bg-white shadow flex items-center justify-center hover:bg-neutral-50"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <nav aria-label="Paginación de testimonios" className="mt-4 flex justify-center">
        <ul className="flex gap-3">
          {Array.from({ length: totalSlides }, (_, p) => {
            const isActive = p === slide;
            return (
              <li key={p}>
                <button
                  type="button"
                  aria-label={`Ir al testimonio ${p + 1}`}
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
    </section>
  );
}