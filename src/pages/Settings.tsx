export default function Settings() {
  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Profile Information</h2>
          <p className="text-slate-500 text-sm mb-4">Update your account details and profile settings.</p>
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3498DB]/20 focus:border-[#3498DB] outline-none" defaultValue="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3498DB]/20 focus:border-[#3498DB] outline-none" defaultValue="jane@example.org" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Organization</h2>
          <p className="text-slate-500 text-sm mb-4">Manage your non-profit details.</p>
          <div className="space-y-4 max-w-lg">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3498DB]/20 focus:border-[#3498DB] outline-none" defaultValue="Global Relief Initiative" />
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-end">
           <button className="bg-[#3498DB] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2980B9] transition-colors shadow-sm">
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
}
