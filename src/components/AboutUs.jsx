import React from 'react'
import gato from '../assets/Milu.png'
import perritos from '../assets/perritos_vision.png'
import colaboradores from '../assets/colaboradores_metas.png'

export const AboutUs = () => {
  return (
    <section aria-labelledby="sobre-nosotros-title" className="max-w-7xl mx-auto px-6 py-10">
        <h2 id="sobre-nosotros-title" className="font-bold text-black text-3xl px-4 md:px-10 mb-8">
            Sobre nosotros
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10 pb-20">
            <li className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={gato} alt="" aria-hidden="true" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Misión</h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-prose">
                Rescatar, rehabilitar y proteger a perros y gatos en situación de abandono o maltrato en Patzún, brindándoles un hogar temporal, atención veterinaria y todo el amor necesario. Trabajamos incansablemente para encontrarles familias responsables y definitivas, promoviendo el respeto y la compasión hacia todos los seres vivos.
                </p>
            </div>
            </li>

            <li className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={perritos} alt="" aria-hidden="true" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Visión</h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-prose">
                Ser la organización líder en el bienestar animal en Patzún y sus alrededores, logrando una comunidad donde el maltrato y el abandono sean inaceptables. Aspiramos a un futuro donde cada animal tenga un hogar seguro y digno, a través de la educación constante y la colaboración ciudadana.
                </p>
            </div>
            </li>

            <li className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={colaboradores} alt="" aria-hidden="true" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Metas</h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-prose">
                1. Aumentar las Adopciones: Duplicar el número de rescates y adopciones exitosas en el próximo año, asegurando que cada animal encuentre un hogar amoroso.

                2. Promover la Esterilización: Organizar jornadas de esterilización masivas y accesibles para controlar la sobrepoblación animal de manera ética y humanitaria.

                3. Fomentar la Conciencia: Implementar programas educativos comunitarios sobre la tenencia responsable de mascotas y la prevención del maltrato animal.
                </p>
            </div>
            </li>
        </ul>
    </section>
  )
}
