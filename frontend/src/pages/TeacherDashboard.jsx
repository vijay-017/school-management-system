import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Clock,
  ChevronRight,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { useAuth } from '../context/AuthContext';

const QuickLink = ({ icon: Icon, label, sub, color, to }) => (
  <FloatingCard className="flex items-center gap-4 cursor-pointer group hover:border-neon-cyan/40 transition-all">
    <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} flex-shrink-0`}>
      <Icon size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white font-semibold text-sm group-hover:text-neon-cyan transition-colors">{label}</p>
      <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
    </div>
    <ChevronRight size={16} className="text-slate-600 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
  </FloatingCard>
);

const MOCK_CLASSES = [
  { name: 'Grade 10-A', subject: 'Mathematics', students: 34, time: '08:00 – 09:00' },
  { name: 'Grade 9-B',  subject: 'Physics',     students: 28, time: '10:00 – 11:00' },
  { name: 'Grade 11-C', subject: 'Mathematics', students: 30, time: '13:00 – 14:00' },
];

const MOCK_SCHEDULE = [
  { period: 'P1', time: '08:00', class: 'Grade 10-A', subject: 'Math',    room: 'R-201' },
  { period: 'P2', time: '09:00', class: 'Free Period', subject: '',       room: '' },
  { period: 'P3', time: '10:00', class: 'Grade 9-B',  subject: 'Physics', room: 'Lab-1' },
  { period: 'P4', time: '11:00', class: 'Grade 9-B',  subject: 'Physics', room: 'Lab-1' },
  { period: 'P5', time: '13:00', class: 'Grade 11-C', subject: 'Math',    room: 'R-105' },
];

const TeacherDashboard = () => {
  const { auth } = useAuth();

  useEffect(() => {
    anime({
      targets: '.teacher-stagger',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      easing: 'easeOutExpo',
      duration: 900,
    });
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-10 teacher-stagger">
        <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-1">Teacher Portal</p>
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome, <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">{auth?.username ?? 'Teacher'}</span>
        </h1>
        <p className="text-slate-400">Here's your teaching schedule and class overview for today.</p>
      </header>

      {/* Stat Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {[
          { icon: BookOpen,      label: 'Assigned Classes',   value: '3',    color: 'neon-cyan' },
          { icon: Users,         label: 'Total Students',     value: '92',   color: 'neon-violet' },
          { icon: CheckCircle2,  label: 'Attendance Logged',  value: '2/3',  color: 'emerald-400' },
          { icon: ClipboardList, label: 'Marks Pending',      value: '1',    color: 'neon-pink' },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <FloatingCard key={i} className={`teacher-stagger`} delay={i * 0.1}>
            <div className={`w-10 h-10 rounded-xl bg-${color}/10 flex items-center justify-center text-${color} mb-4`}>
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</div>
          </FloatingCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Today's Timetable */}
        <FloatingCard className="teacher-stagger lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-neon-cyan" size={20} />
              Today's Timetable
            </h2>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border border-white/10 rounded-lg px-2 py-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="space-y-2">
            {MOCK_SCHEDULE.map((slot, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  slot.subject
                    ? 'bg-white/5 border border-white/10 hover:border-neon-cyan/30'
                    : 'bg-transparent border border-dashed border-white/5'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-bold w-6">{slot.period}</span>
                <span className="text-xs text-slate-500 w-12">{slot.time}</span>
                {slot.subject ? (
                  <>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{slot.class}</p>
                      <p className="text-[10px] text-neon-cyan uppercase font-bold tracking-wider">{slot.subject}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-white/5 rounded px-2 py-1">{slot.room}</span>
                  </>
                ) : (
                  <span className="text-sm text-slate-600 italic flex-1">Free Period</span>
                )}
              </div>
            ))}
          </div>
        </FloatingCard>

        {/* Quick Actions */}
        <div className="space-y-4 teacher-stagger">
          <h2 className="text-lg font-bold text-white px-1 flex items-center gap-2">
            <AlertCircle className="text-neon-violet" size={18} />
            Quick Actions
          </h2>
          <QuickLink
            icon={CalendarCheck}
            label="Mark Attendance"
            sub="Log today's class attendance"
            color="neon-cyan"
            to="/dashboard/teacher/attendance"
          />
          <QuickLink
            icon={ClipboardList}
            label="Enter Marks"
            sub="Grade 9-B Physics pending"
            color="neon-pink"
            to="/dashboard/teacher/marks"
          />
          <QuickLink
            icon={BookOpen}
            label="My Classes"
            sub="View all assigned classes"
            color="neon-violet"
            to="/dashboard/teacher/classes"
          />
          <QuickLink
            icon={Clock}
            label="Full Timetable"
            sub="Weekly schedule view"
            color="neon-blue"
            to="/dashboard/teacher/timetable"
          />
        </div>
      </div>

      {/* Class Overview */}
      <FloatingCard className="teacher-stagger">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="text-neon-blue" size={20} />
          My Classes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Class', 'Subject', 'Students', 'Today\'s Period'].map(h => (
                  <th key={h} className="text-left text-[10px] text-slate-500 font-bold uppercase tracking-widest pb-3 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {MOCK_CLASSES.map((cls, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-6 text-white font-medium">{cls.name}</td>
                  <td className="py-3 pr-6">
                    <span className="text-neon-cyan text-xs font-bold uppercase tracking-wider">{cls.subject}</span>
                  </td>
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-500" />
                      <span className="text-slate-300">{cls.students}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-400">{cls.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FloatingCard>
    </div>
  );
};

export default TeacherDashboard;
