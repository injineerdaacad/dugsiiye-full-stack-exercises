export default function PageHeader({ title, description }) {
  return (
    <div className="border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-0.5 text-sm text-slate-500">{description}</p>
    </div>
  );
}
