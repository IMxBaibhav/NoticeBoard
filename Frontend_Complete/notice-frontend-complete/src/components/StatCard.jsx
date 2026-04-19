export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}
