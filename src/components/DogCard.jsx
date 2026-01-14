import { Link } from "react-router-dom";

export default function DogCard({ d }) {
  return (
    <article className="rounded-xl bg-neutral-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="w-full flex justify-center">
        <div className="w-64 h-64 rounded-lg overflow-hidden bg-neutral-200">
          {d.foto ? (
            <img src={d.foto} alt={d.nombre} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{d.nombre}</h3>
        <p className="text-sm text-neutral-700">
          {d.edad_anios} año{d.edad_anios !== 1 ? "s" : ""} · {d.raza} · {d.sexo}
        </p>
      </div>

      <div className="flex justify-end mt-2">
        <Link
          to={`/adopciones/${d.id}`}
          className={`px-4 py-2 rounded font-medium ${
            d.disponible
              ? "bg-black text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              : "bg-neutral-300 text-neutral-600 cursor-not-allowed pointer-events-none"
          }`}
        >
          Conóceme
        </Link>
      </div>
    </article>
  );
}