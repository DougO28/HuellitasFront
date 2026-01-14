import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import { fetchNewsById } from "../services/newsApi";

export default function NewsDetail() {
  // CAMBIO: id → slug
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      // fetchNewsById ahora recibe el slug
      const res = await fetchNewsById(slug);
      if (active) {
        setItem(res.data);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [slug]); // CAMBIO: dependencia id → slug

  if (loading) return <div className="px-6 py-10">Cargando…</div>;
  if (!item) return <div className="px-6 py-10">No encontramos esta noticia.</div>;

  return (
    <>
      <Hero message="¡Infórmate de nuestras actividades!" />

      <article className="mx-auto max-w-4xl px-6 py-12">
        <header className="text-center">
          {/* CAMBIO: item.title → item.titulo */}
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {item.titulo}
          </h1>
          
          {/* Agregar metadatos */}
          <div className="mt-4 flex justify-center gap-4 text-sm text-neutral-600">
            <span>Por {item.autor}</span>
            <span>•</span>
            <span>
              {new Date(item.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>

        {/* Mostrar imagen */}
        {item.imagen && (
          <figure className="mt-8">
            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full rounded-2xl object-cover"
            />
          </figure>
        )}

        {/* Mostrar resumen si existe */}
        {item.resumen && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-neutral-700 font-medium">{item.resumen}</p>
          </div>
        )}

        {/* CAMBIO: item.body (array) → item.contenido (string) */}
        <div className="mt-8 space-y-6 text-neutral-700 leading-relaxed whitespace-pre-wrap">
          {item.contenido}
        </div>

        <div className="mt-10">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <span aria-hidden="true">←</span>
            Regresar a noticias
          </Link>
        </div>
      </article>
    </>
  );
}