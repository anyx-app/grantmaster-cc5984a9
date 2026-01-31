import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';

const stats = [
  { 
    title: 'Active Grants', 
    value: '12', 
    change: '+2', 
    trend: 'up',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  { 
    title: 'Pending Review', 
    value: '5', 
    change: '-1', 
    trend: 'down',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  { 
    title: 'Win Rate', 
    value: '68%', 
    change: '+5%', 
    trend: 'up',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  { 
    title: 'Upcoming Deadlines', 
    value: '3', 
    change: 'This Week', 
    trend: 'neutral',
    icon: AlertCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  },
];

const upcomingDeadlines = [
  { id: 1, title: 'Community Impact Fund', funder: 'Global Foundation', date: '2024-06-15', amount: '$50,000' },
  { id: 2, title: 'Tech for Good Initiative', funder: 'TechCorp Philanthropy', date: '2024-06-22', amount: '$25,000' },
  { id: 3, title: 'Youth Education Grant', funder: 'City Council', date: '2024-06-30', amount: '$10,000' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero / Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Jane</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your grant pipeline today.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#3498DB] hover:bg-[#2980B9] text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          New Opportunity
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : stat.trend === 'down' ? 'text-rose-700 bg-rose-50' : 'text-slate-600 bg-slate-100'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Activity / Pipeline */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">Pipeline Overview</h3>
              <button className="text-[#3498DB] text-sm font-medium hover:underline flex items-center gap-1">
                View Kanban <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              {/* Placeholder for Chart */}
              <div className="h-64 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>Pipeline analytics visualization will appear here.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Recent Applications</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {i === 1 ? 'GF' : i === 2 ? 'NS' : 'EF'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-[#3498DB] transition-colors">STEM Education Expansion</h4>
                      <p className="text-sm text-slate-500">National Science Foundation • Submitted 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                      Under Review
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white">
                <h3 className="font-bold text-lg">Approaching Deadlines</h3>
                <p className="text-slate-300 text-sm mt-1">3 grants due in the next 14 days</p>
             </div>
             <div className="p-2">
                {upcomingDeadlines.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">{item.title}</h4>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Due {item.date.split('-')[2]} Jun</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{item.funder}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                       <span>{item.amount}</span>
                       <span className="flex items-center gap-1 text-slate-500">
                         High Priority
                       </span>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-4 border-t border-slate-100 bg-slate-50">
               <button className="w-full py-2 text-sm text-slate-600 font-medium hover:text-[#3498DB] transition-colors">
                 View Calendar
               </button>
             </div>
          </div>

          <div className="bg-[#3498DB]/5 rounded-xl border border-[#3498DB]/10 p-6">
            <h3 className="font-bold text-[#2C3E50] mb-2">Need Help?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Check out our documentation to learn best practices for grant tracking.
            </p>
            <button className="text-sm font-semibold text-[#3498DB] hover:text-[#2980B9]">
              Read Documentation &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
