export default function Opportunities() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Grant Opportunities</h1>
        <button className="bg-[#3498DB] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2980B9] transition-colors shadow-sm">
          Add Opportunity
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No opportunities found</h3>
          <p className="text-slate-500 mb-6">Start by adding a new grant opportunity to your database to begin tracking.</p>
        </div>
      </div>
    </div>
  );
}
