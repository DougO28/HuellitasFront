export default function DetailFieldRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-white/60">
      <span className="font-medium">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}