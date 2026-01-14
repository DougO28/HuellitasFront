import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDogById } from "../services/dogsApi";
import DogDetailsSidebar from "../components/DogDetailsSidebar";
import Hero from "../components/Hero";

export default function DogDetail() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetchDogById(id);
      setDog(res.data);
    })();
  }, [id]);

  if (!dog) return <div className="p-6">Cargando…</div>;

  return (
    <section className="">
        <Hero message="Muy buena elección!"/>
      <h1 className="text-4xl font-bold text-sky-700 text-center mb-8 mt-8">{dog.nombre}</h1>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl overflow-hidden">
                <div className="w-full aspect-video bg-neutral-200">
                {dog.foto ? (
                    <img
                    src={dog.foto}
                    alt={`Foto de ${dog.nombre}`}
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    Sin imagen
                    </div>
                )}
                </div>
            </div>

            <section
                aria-labelledby="sobre-mi-title"
                className="rounded-xl bg-sky-200/70 text-sky-900"
            >
                <h2 id="sobre-mi-title" className="text-xl font-bold px-5 pt-4">Sobre mi</h2>
                <p className="px-5 pb-5 pt-2 leading-relaxed">
                {dog.descripcion || "Sin descripción."}
                </p>
            </section>
            </div>

            <DogDetailsSidebar dog={dog} />
        </div>

        <div className="mt-8 flex justify-center">
          {dog.disponible ? (
            <Link
              to={`/adopciones/${dog.id}/formulario`}
              className="inline-flex px-8 py-3 rounded-xl bg-sky-400 text-white font-semibold shadow transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              ¡Adóptame!
            </Link>
          ) : (
            <span
              className="inline-flex px-8 py-3 rounded-xl bg-neutral-300 text-neutral-600 font-semibold shadow cursor-not-allowed"
              aria-disabled="true"
            >
              No disponible
            </span>
          )}
        </div>
      </div>
    
    </section>
  );
}
