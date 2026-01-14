export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación" className="mt-8 flex justify-center">
      <ul className="flex items-end gap-6">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <li key={p} className="flex flex-col items-center">
              <span className={`mb-1 text-lg ${isActive ? "text-black" : "text-neutral-400"}`}>
                {p}
              </span>

              <button
                type="button"
                onClick={() => onChange(p)}
                aria-label={`Ir a la página ${p}`}
                aria-current={isActive ? "page" : undefined}
                className={`
                  w-5 h-5 rounded-full shadow
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
                  ${isActive ? "bg-neutral-600" : "bg-neutral-200 hover:bg-neutral-300"}
                `}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}