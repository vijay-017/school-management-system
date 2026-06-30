import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Filter,
  ClipboardList,
  Clock,
  Calendar,
  Settings,
  UserCog,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Map role string → display label
const ROLE_LABELS = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN:       'Admin',
  TEACHER:     'Teacher',
  PARENT:      'Parent',
};

// Nav links per role
const ADMIN_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/dashboard/admin' },
  { icon: GraduationCap,   label: 'Students',       path: '/dashboard/admin/students' },
  { icon: Filter,          label: 'Filter Students',path: '/dashboard/admin/student-filter' },
  { icon: Users,           label: 'Teachers',       path: '/dashboard/admin/teachers' },
  { icon: UserCircle,      label: 'Parents',        path: '/dashboard/admin/parents' },
  { icon: BookOpen,        label: 'Classes',        path: '/dashboard/admin/classes' },
  { icon: ClipboardList,   label: 'Subjects',       path: '/dashboard/admin/subjects' },
  { icon: CalendarCheck,   label: 'Attendance',     path: '/dashboard/admin/attendance' },
  { icon: BarChart3,       label: 'Exams',          path: '/dashboard/admin/exams' },
  { icon: BarChart3,       label: 'Marks',          path: '/dashboard/admin/marks' },
  { icon: Calendar,        label: 'Timetable',      path: '/dashboard/admin/timetable' },
  { icon: UserCog,         label: 'User Management',path: '/dashboard/admin/users' },
];

const TEACHER_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/dashboard/teacher' },
  { icon: BookOpen,        label: 'My Classes',     path: '/dashboard/teacher/classes' },
  { icon: CalendarCheck,   label: 'Mark Attendance',path: '/dashboard/teacher/attendance' },
  { icon: ClipboardList,   label: 'Enter Marks',    path: '/dashboard/teacher/marks' },
  { icon: Clock,           label: 'My Timetable',   path: '/dashboard/teacher/timetable' },
];

const PARENT_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '/dashboard/parent' },
  { icon: CalendarCheck,   label: "Child's Attendance", path: '/dashboard/parent/attendance' },
  { icon: BarChart3,       label: "Child's Marks",  path: '/dashboard/parent/marks' },
  { icon: Clock,           label: "Child's Timetable", path: '/dashboard/parent/timetable' },
];

const NAV_BY_ROLE = {
  SUPER_ADMIN: ADMIN_LINKS,
  ADMIN:       ADMIN_LINKS,
  TEACHER:     TEACHER_LINKS,
  PARENT:      PARENT_LINKS,
};

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const role = auth?.role ?? 'ADMIN';
  const links = NAV_BY_ROLE[role] ?? ADMIN_LINKS;
  const roleLabel = ROLE_LABELS[role] ?? role;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-64 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand */}
      <div className="p-8 pb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent neon-text">
          AETHERIS
        </h1>
        <p className="text-[10px] text-neon-cyan uppercase tracking-[0.2em] mt-1 font-semibold">
          School Management
        </p>
      </div>

      {/* User chip */}
      {auth && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-bold text-sm flex-shrink-0">
            {auth.username?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{auth.username}</p>
            <p className="text-neon-cyan text-[10px] uppercase tracking-widest font-bold">{roleLabel}</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path.split('/').length <= 3}  /* exact match for dashboard root */
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300
              ${isActive
                ? 'bg-white/10 text-neon-cyan border border-white/10 neon-border'
                : 'text-slate-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <link.icon size={18} />
            <span className="font-medium text-sm">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          id="sidebar-logout"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
