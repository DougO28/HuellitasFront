import ayudanos1 from "../assets/ayudanos_1.png";
import ayudanos2 from "../assets/ayudanos_2.png";
import ayudanos3 from "../assets/ayudanos_3.png";
import ayudanos4 from "../assets/ayudanos_4.png";

const HELP_BLOCKS = [
  {
    id: "economico",
    title: "Donativo Económico",
    description: "Tu aporte económico nos permite cubrir gastos veterinarios, medicamentos, alimento y el mantenimiento de nuestras instalaciones. Cada donación, sin importar el monto, marca la diferencia en la vida de un animal rescatado. Puedes realizar tu donativo por transferencia bancaria o depósito.",
    bankInfo: "Banco: Banrural | Cuenta Ahorro: 4468043934 | A nombre de: Astrid Teleguario",
    bankInfo2: "Banco: Banco Industrial | Cuenta Ahorro: 6119546 | A nombre de: Astrid Teleguario",
    image: ayudanos1,
    bg: "bg-sky-100",
    text: "text-sky-900",
    reverse: false,
  },
  {
    id: "alimentos",
    title: "Donativo de Alimentos",
    description: "El alimento es una de nuestras mayores necesidades. Aceptamos concentrado para perros y gatos de todas las edades, así como alimento húmedo. También necesitamos snacks y premios para el entrenamiento. Puedes traer tu donativo directamente a nuestro refugio o coordinar la entrega contactándonos.",
    image: ayudanos2,
    bg: "bg-amber-100",
    text: "text-amber-900",
    reverse: true,
  },
  {
    id: "material",
    title: "Donativo Material",
    description: "Necesitamos artículos como cobijas, toallas, periódico, productos de limpieza, collares, correas, platos, juguetes, medicamentos y material de curación. También aceptamos construcción de casitas, cercas y mejoras para nuestras instalaciones. Cualquier artículo en buen estado es bienvenido.",
    image: ayudanos3,
    bg: "bg-sky-100",
    text: "text-sky-900",
    reverse: false,
  },
  {
    id: "voluntariado",
    title: "Voluntariado",
    description: "Únete a nuestro equipo de voluntarios y ayúdanos directamente en el refugio. Necesitamos personas para pasear perros, socializar gatitos, limpiar instalaciones, ayudar en eventos de adopción, tomar fotografías, manejar redes sociales o brindar transporte. Tu tiempo y dedicación son invaluables.",
    image: ayudanos4,
    bg: "bg-amber-100",
    text: "text-amber-900",
    reverse: true,
  },
];

export default function Ayudanos() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-neutral-900">Ayúdanos</h2>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          Existen muchas formas de apoyar a Huellitas. Elige la que mejor se adapte a ti y ayúdanos a seguir cambiando vidas.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {HELP_BLOCKS.map((block) => (
          <article
            key={block.id}
            className="overflow-hidden rounded-3xl border border-neutral-200 shadow-lg"
          >
            <div
              className={`flex flex-col ${block.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              <div className="md:w-1/2">
                <img
                  src={block.image}
                  alt={block.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className={`md:w-1/2 ${block.bg} ${block.text} px-6 py-8 sm:px-10 sm:py-12 flex flex-col justify-center`}
              >
                <h3 className="text-2xl font-semibold">{block.title}</h3>
                <p className="mt-4 text-sm leading-relaxed sm:text-base">
                  {block.description}
                </p>
                {/* Información bancaria solo para donativo económico */}
                {block.bankInfo && (
  <div className="mt-4 p-3 bg-white/50 rounded-lg">
    <p className="text-xs font-medium">{block.bankInfo}</p>
  </div>
)}
{block.bankInfo2 && (
  <div className="mt-2 p-3 bg-white/50 rounded-lg">
    <p className="text-xs font-medium">{block.bankInfo2}</p>
  </div>
)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="/contacto"
          className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Contáctanos para más información
        </a>
      </div>
    </section>
  );
}