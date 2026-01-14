import React from 'react'
import icono_casa from '../assets/icono_casa.png'
import icono_formulario from '../assets/icono_formulario.png'
import icono_telefono from '../assets/icono_telefono.png'
import icono_huella from '../assets/icono_huella.png'
import { Link } from 'react-router-dom'

const ProcesoAdopcion = () => {
  return (
    <section
    aria-labelledby="adopcion-title"
    className="p py-14"
    >
        <div className="mx-auto bg-gradient-to-b from-neutral-200 to-white py-12">
            <h2 id="adopcion-title" className="text-center font-bold text-black text-3xl md:text-4xl">
            Proceso de Adopción
            </h2>

            <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
            <li className="text-center">
                <img src={icono_huella} alt="" aria-hidden="true" className="mx-auto h-16 w-16" />
                <h3 className="mt-4 text-xl font-semibold">
                <span className="sr-only">Paso 1: </span>Conoce a los perritos
                </h3>
                <p className="mt-2 text-sm text-neutral-800 max-w-xs mx-auto">
                Visitá la galería o ven al albergue para conocerlos.
                </p>
            </li>

            <li className="text-center">
                <img src={icono_formulario} alt="" aria-hidden="true" className="mx-auto h-16 w-16" />
                <h3 className="mt-4 text-xl font-semibold">
                <span className="sr-only">Paso 2: </span>Llena el formulario
                </h3>
                <p className="mt-2 text-sm text-neutral-800 max-w-xs mx-auto">
                Te pedimos algunos datos y tu motivación para adoptar.
                </p>
            </li>

            <li className="text-center">
                <img src={icono_telefono} alt="" aria-hidden="true" className="mx-auto h-16 w-16" />
                <h3 className="mt-4 text-xl font-semibold">
                <span className="sr-only">Paso 3: </span>Pequeña entrevista
                </h3>
                <p className="mt-2 text-sm text-neutral-800 max-w-xs mx-auto">
                Queremos asegurarnos que sea un buen hogar para ambos.
                </p>
            </li>

            <li className="text-center">
                <img src={icono_casa} alt="" aria-hidden="true" className="mx-auto h-16 w-16" />
                <h3 className="mt-4 text-xl font-semibold">
                <span className="sr-only">Paso 4: </span>Llévalo a casa
                </h3>
                <p className="mt-2 text-sm text-neutral-800 max-w-xs mx-auto">
                Disfruta de tu mejor amigo en casa.
                </p>
            </li>
            </ol>

            <div className="mt-10 flex justify-center">
            <Link
                to="/adopciones"
                className="rounded-lg bg-black px-5 py-2 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-describedby="adopcion-desc"
            >
                Quiero adoptar
            </Link>
            <span id="adopcion-desc" className="sr-only">
                Ir a la sección de adopción para iniciar el proceso.
            </span>
            </div>
        </div>
    </section>
  )
}

export default ProcesoAdopcion