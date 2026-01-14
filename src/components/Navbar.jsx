import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const baseClasses = "font-extrabold text-xl py-2 px-4";
  const active = "bg-black text-white";
  const inactive = "bg-transparent text-black";

  return (
    <header className="bg-white w-full">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 h-16">
        <Link to="/" className="font-extrabold text-4xl py-2 px-4">
          Huellitas 🐾
        </Link>

        <nav className="hidden md:flex flex-row gap-4">
          <NavLink to="/" end className={({ isActive }) => `${baseClasses} ${isActive ? active : inactive}`}>Inicio</NavLink>
          <NavLink to="/noticias" className={({ isActive }) => `${baseClasses} ${isActive ? active : inactive}`}>Noticias</NavLink>
          <NavLink to="/adopciones" className={({ isActive }) => `${baseClasses} ${isActive ? active : inactive}`}>Adopción</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => `${baseClasses} ${isActive ? active : inactive}`}>Contacto</NavLink>
          <NavLink to="/ayudanos" className={({ isActive }) => `${baseClasses} ${isActive ? active : inactive}`}>Ayudanos</NavLink>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Abrir menú</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden px-5 pb-4 origin-top transition-all duration-200 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <nav className="flex flex-col gap-2">
          <NavLink onClick={() => setOpen(false)} to="/" end className={({ isActive }) => `${baseClasses} w-full text-left ${isActive ? active : inactive}`}>Inicio</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/noticias" className={({ isActive }) => `${baseClasses} w-full text-left ${isActive ? active : inactive}`}>Noticias</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/adopciones" className={({ isActive }) => `${baseClasses} w-full text-left ${isActive ? active : inactive}`}>Adopción</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contacto" className={({ isActive }) => `${baseClasses} w-full text-left ${isActive ? active : inactive}`}>Contacto</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/ayudanos" className={({ isActive }) => `${baseClasses} w-full text-left ${isActive ? active : inactive}`}>Ayudanos</NavLink>
        </nav>
      </div>
    </header>
  );
}
