export default function Pipeline() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Application Pipeline</h1>
        <div className="flex gap-2">
            <span className="text-sm text-slate-500 self-center mr-2">View: Board</span>
        </div>
      </div>
      
      {/* Kanban Board Placeholder */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="inline-flex h-full gap-6 min-w-full">
           {['Identified', 'Researching', 'Drafting', 'Review', 'Submitted'].map((status) => (
             <div key={status} className="w-80 flex-shrink-0 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200/60 max-h-full">
               <div className="p-4 font-semibold text-slate-700 flex justify-between items-center sticky top-0 bg-slate-100/50 backdrop-blur-sm rounded-t-xl z-10">
                 {status}
                 <span className="bg-white px-2 py-0.5 rounded-full text-xs shadow-sm text-slate-500">0</span>
               </div>
               <div className="p-3 flex-1 overflow-y-auto">
                 {/* Empty State for Column */}
                 <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                   No items
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
