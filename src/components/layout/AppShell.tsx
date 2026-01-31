import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  KanbanSquare, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  Menu,
  Plus
} from 'lucide-react';
import { useState } from 'react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Opportunities', to: '/opportunities', icon: Briefcase },
    { name: 'Pipeline', to: '/pipeline', icon: KanbanSquare },
    { name: 'Documents', to: '/documents', icon: FileText },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    const currentRoute = navigation.find(item => item.to === location.pathname);
    return currentRoute ? currentRoute.name : 'Overview';
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#2C3E50] transition-all duration-300 ease-in-out flex flex-col shadow-xl z-20 relative`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#3498DB] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className={`text-white font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              GrantMaster
            </span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#3498DB] text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm sticky top-0">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-slate-800 tracking-tight">{getPageTitle()}</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3498DB] transition-colors" />
              <input 
                type="text" 
                placeholder="Search grants..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white border focus:border-[#3498DB] rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#3498DB]/10 w-64 transition-all"
              />
            </div>

            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3498DB] to-[#2C3E50] text-white flex items-center justify-center font-medium text-sm shadow-md">
                JD
              </div>
              <span className="text-sm font-medium text-slate-700 hidden md:block">Jane Doe</span>
            </button>
          </div>
        </header>

        {/* Page Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8 scroll-smooth">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
