import { useLocation } from "react-router-dom";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.53 17.52 2 12 2S2 6.53 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58v1.9h2.79l-.45 2.9h-2.34V22c4.78-.78 8.44-4.93 8.44-9.94Z"/>
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2Zm5.25-.95a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"/>
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 3h4.7l5.4 7.4L18.7 3H21l-6.9 9.4L21 21h-4.7l-5.6-7.6L5.3 21H3l7-9.6L3 3Z"/>
    </svg>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const year = new Date().getFullYear();

  if (isHome) {
    // ===== Versión Home (grande)
    return (
      <footer className="mt-16">
        <div className="bg-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-start justify-between gap-8">
            <div>
              <div className="text-3xl font-extrabold tracking-tight">Huellitas 🐾</div>
              <p className="mt-3 max-w-md text-sm text-neutral-700">
                Rescate de perros callejeros para castrarlos y darlos en adopción, con el fin de reducir
                la sobrepoblación canina en la calle y mejorar su calidad de vida.
              </p>
            </div>

            <nav aria-label="Redes sociales" className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/HuellitasPatzun" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Huellitas" 
                className="p-2 rounded-lg bg-black text-white hover:bg-blue-600 transition"
              >
                <FacebookIcon className="w-5 h-5 fill-white" />
              </a>
              <a 
                href="https://www.instagram.com/huellitas___?igsh=MXV1d2RxdndiOGlkNg==" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Huellitas" 
                className="p-2 rounded-lg bg-black text-white hover:bg-pink-600 transition"
              >
                <InstagramIcon className="w-5 h-5 fill-white" />
              </a>
              <a 
                href="https://x.com/huellitas___?t=UIS9wGIWv7ZLWBeOXdKKew&s=09" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) de Huellitas" 
                className="p-2 rounded-lg bg-black text-white hover:bg-sky-500 transition"
              >
                <XIcon className="w-5 h-5 fill-white" />
              </a>
            </nav>
          </div>
        </div>

        <div className="bg-neutral-600 text-white/90">
          <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
            <p className="text-sm">
              <span className="font-semibold">Huellitas</span> - Todos los derechos reservados {year}
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/HuellitasPatzun" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Huellitas" 
                className="p-1.5 rounded bg-white/10 hover:bg-blue-600 transition"
              >
                <FacebookIcon className="w-4 h-4 fill-white" />
              </a>
              <a 
                href="https://www.instagram.com/huellitas___?igsh=MXV1d2RxdndiOGlkNg==" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Huellitas" 
                className="p-1.5 rounded bg-white/10 hover:bg-pink-600 transition"
              >
                <InstagramIcon className="w-4 h-4 fill-white" />
              </a>
              <a 
                href="https://x.com/huellitas___?t=UIS9wGIWv7ZLWBeOXdKKew&s=09" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) de Huellitas" 
                className="p-1.5 rounded bg-white/10 hover:bg-sky-500 transition"
              >
                <XIcon className="w-4 h-4 fill-white" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ===== Versión compacta (otras páginas)
  return (
    <footer className="mt-12 bg-neutral-600 text-white/90">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <p className="text-sm">
          <span className="font-semibold">Huellitas</span> - Todos los derechos reservados {year}
        </p>
        <nav aria-label="Redes sociales" className="flex items-center gap-3">
          <a 
            href="https://www.facebook.com/HuellitasPatzun" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Huellitas" 
            className="p-1.5 rounded bg-white/10 hover:bg-blue-600 transition"
          >
            <FacebookIcon className="w-4 h-4 fill-white" />
          </a>
          <a 
            href="https://www.instagram.com/huellitas___?igsh=MXV1d2RxdndiOGlkNg==" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Huellitas" 
            className="p-1.5 rounded bg-white/10 hover:bg-pink-600 transition"
          >
            <InstagramIcon className="w-4 h-4 fill-white" />
          </a>
          <a 
            href="https://x.com/huellitas___?t=UIS9wGIWv7ZLWBeOXdKKew&s=09" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) de Huellitas" 
            className="p-1.5 rounded bg-white/10 hover:bg-sky-500 transition"
          >
            <XIcon className="w-4 h-4 fill-white" />
          </a>
        </nav>
      </div>
    </footer>
  );
}