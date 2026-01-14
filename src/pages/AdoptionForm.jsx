import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import AdoptionSteps from "../components/AdoptionSteps";
import AdoptionFormCard from "../components/AdoptionFormCard";
import { fetchDogById } from "../services/dogsApi";

const introText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae libero sed sem euismod tristique. Nulla ornare tristique eleifend. Ut venenatis ex sit amet felis sagittis, nec feugiat lorem fermentum. In feugiat mauris sagittis aliquet hendrerit. Cras quam nisi, condimentum nec ultricies eget, iaculis ut ex. Phasellus venenatis magna sit amet velit molestie, mollis volutpat lacus tincidunt. Etiam pellentesque tempus tempus. Pellentesque lobortis ligula sed mattis tempor.";

export default function AdoptionForm() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);
      const res = await fetchDogById(id);
      if (isMounted) {
        setDog(res.data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div className="px-6 py-10">Cargando…</div>;
  if (!dog) return <div className="px-6 py-10">No encontramos a este perrito.</div>;

  return (
    <>
      <Hero message="Gracias por querer adoptarme!" />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <header className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Formulario de adopción</h1>
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">{introText}</p>
        </header>

        <div className="mt-12">
          <AdoptionSteps />
        </div>

        <AdoptionFormCard dog={dog} />
      </section>
    </>
  );
}
