import DetailFieldRow from "./DetailFieldRow";

const yesNo = (b) => (b ? "Sí" : "No");
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export default function DogDetailsSidebar({ dog }) {
  return (
    <aside
      className="rounded-xl bg-sky-200/70 p-5 text-sky-900"
      aria-label="Detalles de la mascota"
    >
      <h3 className="text-xl font-bold mb-2">Detalles de la mascota</h3>
      <div className="rounded-lg bg-sky-200/50 p-4">
        <DetailFieldRow label="Nombre:" value={dog.nombre} />
        <DetailFieldRow label="Edad:" value={`${dog.edad_anios} año${dog.edad_anios !== 1 ? "s" : ""}`} />
        <DetailFieldRow label="Raza:" value={dog.raza} />
        <DetailFieldRow label="Sexo:" value={dog.sexo} />
        <DetailFieldRow label="Tamaño:" value={cap(dog.tamanio)} />
      </div>

      <h3 className="text-xl font-bold mt-5 mb-2">Características especiales</h3>
      <div className="rounded-lg bg-sky-200/50 p-4">
        <DetailFieldRow label="Amigable con niños" value={yesNo(dog.amigable_ninos)} />
        <DetailFieldRow label="Se adapta a vivir dentro de casa" value={yesNo(dog.adapta_interior)} />
        <DetailFieldRow label="Fácil de entrenar" value={"—"} />
        <DetailFieldRow label="Nivel de energía" value={cap(dog.nivel_energia)} />
      </div>

      <h3 className="text-xl font-bold mt-5 mb-2">Adopción</h3>
      <div className="rounded-lg bg-sky-200/50 p-4">
        <DetailFieldRow label="¿Aún disponible?" value={yesNo(dog.disponible)} />
      </div>
    </aside>
  );
}