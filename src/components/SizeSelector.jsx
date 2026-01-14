const OPTIONS = [
  { val: "", label: "Todos los tamaños" },
  { val: "grande", label: "Grande" },
  { val: "mediano", label: "Mediano" },
  { val: "pequeno", label: "Pequeño" },
];

export default function SizeSelector({ value, onChange }) {
  return (
    <label className="inline-block">
      <span className="sr-only">Filtrar por tamaño</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-44 sm:w-52 h-11 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {OPTIONS.map((option) => (
          <option key={option.val} value={option.val}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
