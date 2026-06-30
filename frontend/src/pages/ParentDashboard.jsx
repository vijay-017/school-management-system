import React, { useEffect, useState } from 'react';
import FloatingCard from '../components/FloatingCard';
import {
  Book,
  Calendar,
  Star,
  Bell,
  ChevronDown,
  Clock,
  BarChart2,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { useAuth } from '../context/AuthContext';

// ── Mock children data ────────────────────────────────────────────────────────
// In production this would come from GET /api/parent/{parentId}/children
const MOCK_CHILDREN = [
  {
    id: 'ST-001',
    name: 'Nova Skye',
    grade: 'Grade 10-A',
    initials: 'NS',
    attendance: 98.2,
    gpa: 3.92,
    gpaTrend: 'Top 5% of Class',
    streak: 12,
    exams: [
      { subject: 'Quantum Physics', topic: 'String Theory', date: 'May 02', priority: 'High' },
      { subject: 'Advanced Math',   topic: 'Tensor Calculus', date: 'May 05', priority: 'Medium' },
      { subject: 'Cyber Ethics',    topic: 'AI Rights',       date: 'May 12', priority: 'Low' },
    ],
    timetable: [
      { period: 'P1', time: '08:00', subject: 'Quantum Physics', teacher: 'Dr. Chen',  room: 'R-301' },
      { period: 'P2', time: '09:00', subject: 'Advanced Math',   teacher: 'Dr. Osei',  room: 'R-201' },
      { period: 'P3', time: '10:00', subject: 'Free Period',      teacher: '',          room: '' },
      { period: 'P4', time: '11:00', subject: 'Cyber Ethics',     teacher: 'Ms. Kotto', room: 'R-102' },
    ],
    recentAttendance: [
      { date: 'Mon', status: 'P' }, { date: 'Tue', status: 'P' },
      { date: 'Wed', status: 'A' }, { date: 'Thu', status: 'P' }, { date: 'Fri', status: 'P' },
    ],
    feedback: [
      { teacher: 'Dr. Chen',  text: 'Nova is showing exceptional grasp of non-linear dynamics. Suggesting advanced track.', date: '2 days ago' },
      { teacher: 'Ms. Kotto', text: 'Great participation in the Galactic History debate last week.',                         date: '1 week ago' },
    ],
  },
  {
    id: 'ST-042',
    name: 'Orion Skye',
    grade: 'Grade 7-C',
    initials: 'OS',
    attendance: 91.5,
    gpa: 3.40,
    gpaTrend: 'Top 25% of Class',
    streak: 5,
    exams: [
      { subject: 'General Science', topic: 'Ecosystems',  date: 'May 03', priority: 'Medium' },
      { subject: 'English',         topic: 'Essay Writing', date: 'May 08', priority: 'High' },
    ],
    timetable: [
      { period: 'P1', time: '08:00', subject: 'English',         teacher: 'Mr. Park',  room: 'R-101' },
      { period: 'P2', time: '09:00', subject: 'General Science', teacher: 'Mrs. Roy',  room: 'Lab-G' },
      { period: 'P3', time: '10:00', subject: 'Mathematics',     teacher: 'Mr. Patel', room: 'R-201' },
      { period: 'P4', time: '11:00', subject: 'Free Period',      teacher: '',          room: '' },
    ],
    recentAttendance: [
      { date: 'Mon', status: 'P' }, { date: 'Tue', status: 'A' },
      { date: 'Wed', status: 'P' }, { date: 'Thu', status: 'L' }, { date: 'Fri', status: 'P' },
    ],
    feedback: [
      { teacher: 'Mr. Park', text: 'Orion needs to improve punctuality in submitting homework.',          date: '3 days ago' },
      { teacher: 'Mrs. Roy', text: 'Showing good improvement in lab practicals. Keep it up!',             date: '5 days ago' },
    ],
  },
];

const STATUS_STYLES = {
  P: { icon: CheckCircle2, cls: 'text-emerald-400',  label: 'Present' },
  A: { icon: XCircle,      cls: 'text-red-400',      label: 'Absent' },
  L: { icon: MinusCircle,  cls: 'text-yellow-400',   label: 'Late' },
};

const PRIORITY_COLOR = { High: 'text-red-400', Medium: 'text-yellow-400', Low: 'text-neon-cyan' };

const ParentDashboard = () => {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState(MOCK_CHILDREN[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const child = MOCK_CHILDREN.find(c => c.id === selectedId) ?? MOCK_CHILDREN[0];

  useEffect(() => {
    anime({
      targets: '.parent-stagger',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      easing: 'easeOutExpo',
      duration: 900,
    });
  }, [selectedId]);

  return (
    <div className="p-8">
      {/* ── Header ── */}
      <header className="mb-8 parent-stagger flex flex-wrap justify-between items-start gap-4">
        <div>
          <p className="text-neon-violet text-xs font-bold uppercase tracking-widest mb-1">Parent Portal</p>
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome, <span className="bg-gradient-to-r from-neon-violet to-neon-cyan bg-clip-text text-transparent">{auth?.username ?? 'Parent'}</span>
          </h1>
          <p className="text-slate-400">Monitoring your children's academic progress.</p>
        </div>
        <button className="relative p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
        </button>
      </header>

      {/* ── Child Selector ── */}
      {MOCK_CHILDREN.length > 1 && (
        <div className="relative inline-block mb-8 parent-stagger">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-white/20 hover:border-neon-violet/50 transition-all text-white font-semibold"
          >
            <div className="w-8 h-8 rounded-xl bg-neon-violet/20 border border-neon-violet/30 flex items-center justify-center text-neon-violet text-xs font-bold">
              {child.initials}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">{child.name}</p>
              <p className="text-[10px] text-slate-400">{child.grade}</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full mt-2 left-0 w-56 glass border border-white/20 rounded-2xl overflow-hidden z-20 shadow-xl">
              {MOCK_CHILDREN.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedId(c.id); setDropdownOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-white/10 ${
                    c.id === selectedId ? 'bg-neon-violet/10 text-neon-violet' : 'text-slate-300'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold">{c.initials}</div>
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-[10px] text-slate-500">{c.grade}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Child Profile + Stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <FloatingCard className="parent-stagger bg-gradient-to-br from-neon-violet/10 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-neon-violet/20 border border-neon-violet/30 flex items-center justify-center text-neon-violet font-bold text-2xl shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              {child.initials}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{child.name}</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">{child.grade} • {child.id}</p>
            </div>
          </div>
          <div className="space-y-3">
            {/* Attendance bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 uppercase font-bold tracking-widest">
                <span className="text-slate-500">Attendance</span>
                <span className={child.attendance >= 95 ? 'text-emerald-400' : child.attendance >= 85 ? 'text-yellow-400' : 'text-red-400'}>
                  {child.attendance}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-700" style={{ width: `${child.attendance}%` }} />
              </div>
            </div>
            {/* Recent attendance dots */}
            <div className="flex items-center gap-2 pt-1">
              {child.recentAttendance.map(({ date, status }) => {
                const { icon: Ic, cls } = STATUS_STYLES[status];
                return (
                  <div key={date} className="flex flex-col items-center gap-1">
                    <Ic size={16} className={cls} />
                    <span className="text-[9px] text-slate-600 font-bold">{date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FloatingCard>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
          <FloatingCard className="parent-stagger">
            <Calendar className="text-neon-cyan mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Attendance</h4>
            <div className="text-2xl font-bold text-white">{child.attendance}%</div>
            <p className="text-[10px] text-emerald-400 mt-2 font-bold uppercase tracking-tighter">
              Perfect Streak: {child.streak} Days
            </p>
          </FloatingCard>

          <FloatingCard className="parent-stagger">
            <Star className="text-neon-violet mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Current GPA</h4>
            <div className="text-2xl font-bold text-white">{child.gpa}</div>
            <p className="text-[10px] text-neon-violet mt-2 font-bold uppercase tracking-tighter">{child.gpaTrend}</p>
          </FloatingCard>

          <FloatingCard className="parent-stagger">
            <BarChart2 className="text-neon-pink mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Exams Coming</h4>
            <div className="text-2xl font-bold text-white">{child.exams.length}</div>
            <p className="text-[10px] text-neon-pink mt-2 font-bold uppercase tracking-tighter">
              Next: {child.exams[0]?.date ?? '—'}
            </p>
          </FloatingCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Exams */}
        <FloatingCard className="parent-stagger">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Book className="text-neon-cyan" size={20} />
            Upcoming Assessments
          </h3>
          <div className="space-y-3">
            {child.exams.map((exam, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:border-neon-cyan/30 transition-all">
                <div>
                  <div className="text-white font-medium group-hover:text-neon-cyan transition-colors">{exam.subject}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{exam.topic}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-bold">{exam.date}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${PRIORITY_COLOR[exam.priority]}`}>
                    {exam.priority} Priority
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>

        {/* Teacher Feedback */}
        <FloatingCard className="parent-stagger">
          <h3 className="text-lg font-bold text-white mb-5">Recent Teacher Feedback</h3>
          <div className="space-y-5">
            {child.feedback.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                  {item.teacher.charAt(item.teacher.lastIndexOf(' ') + 1)}
                </div>
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">"{item.text}"</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-2">{item.teacher} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>

      {/* Today's Timetable */}
      <FloatingCard className="parent-stagger">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Clock className="text-neon-violet" size={20} />
          {child.name}'s Timetable – Today
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {child.timetable.map((slot, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                slot.subject && slot.teacher
                  ? 'bg-white/5 border-white/10 hover:border-neon-violet/30'
                  : 'border-dashed border-white/5'
              }`}
            >
              <span className="text-[10px] text-slate-600 font-bold w-6">{slot.period}</span>
              <span className="text-xs text-slate-500 w-12">{slot.time}</span>
              {slot.teacher ? (
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{slot.subject}</p>
                  <p className="text-[10px] text-slate-500">{slot.teacher} • {slot.room}</p>
                </div>
              ) : (
                <span className="text-sm text-slate-600 italic flex-1">Free Period</span>
              )}
            </div>
          ))}
        </div>
      </FloatingCard>
    </div>
  );
};

export default ParentDashboard;
