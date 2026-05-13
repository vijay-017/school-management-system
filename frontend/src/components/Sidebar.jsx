import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  BarChart3, 
  Wallet, 
  LogOut,
  UserCircle,
  UtensilsCrossed,
  Filter
} from 'lucide-react';

const Sidebar = ({ role = 'admin' }) => {
  const adminLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: GraduationCap, label: 'Students', path: '/admin/students' },
    { icon: Filter, label: 'Filter Students', path: '/admin/student-filter' },
    { icon: Users, label: 'Teachers', path: '/admin/teachers' },
    { icon: BookOpen, label: 'Classes', path: '/admin/classes' },
    { icon: CalendarCheck, label: 'Attendance', path: '/admin/attendance' },
    { icon: BarChart3, label: 'Results', path: '/admin/results' },
    { icon: Wallet, label: 'Fees', path: '/admin/fees' },
    { icon: UtensilsCrossed, label: 'Mid-Day Meal', path: '/admin/meals' },
  ];

  const parentLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/parent' },
    { icon: UserCircle, label: 'Child Profile', path: '/parent/child' },
    { icon: CalendarCheck, label: 'Attendance', path: '/parent/attendance' },
    { icon: BarChart3, label: 'Marks', path: '/parent/marks' },
    { icon: Wallet, label: 'Fees', path: '/parent/fees' },
  ];

  const links = role === 'admin' ? adminLinks : parentLinks;

  return (
    <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent neon-text">
          AETHERIS
        </h1>
        <p className="text-[10px] text-neon-cyan uppercase tracking-[0.2em] mt-1 font-semibold">
          School Management
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-white/10 text-neon-cyan border border-white/10 neon-border' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <link.icon size={20} />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
