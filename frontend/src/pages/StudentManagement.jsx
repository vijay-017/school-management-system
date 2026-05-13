import React, { useState, useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Mail } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    anime({
      targets: '.student-row',
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(50),
      easing: 'easeOutExpo',
      duration: 800
    });
  }, []);

  const students = [
    { id: 'ST-001', name: 'Nova Skye', grade: '10-A', status: 'Active', parent: 'Luna Skye', email: 'nova@aetheris.edu' },
    { id: 'ST-002', name: 'Orion Pax', grade: '12-B', status: 'Active', parent: 'Sentinel Pax', email: 'orion@aetheris.edu' },
    { id: 'ST-003', name: 'Lyra Vance', grade: '9-C', status: 'On Leave', parent: 'Elias Vance', email: 'lyra@aetheris.edu' },
    { id: 'ST-004', name: 'Atlas Thorne', grade: '11-A', status: 'Active', parent: 'Mila Thorne', email: 'atlas@aetheris.edu' },
    { id: 'ST-005', name: 'Selene Moon', grade: '10-B', status: 'Active', parent: 'Diana Moon', email: 'selene@aetheris.edu' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8 stagger-item">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Registry</h1>
          <p className="text-slate-400">Manage pupil dossiers and academic records.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan rounded-xl hover:bg-neon-cyan hover:text-space-950 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <Plus size={20} />
          ENROLL STUDENT
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by name, ID or grade..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <Filter size={20} />
          Filters
        </button>
      </div>

      <FloatingCard className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Grade</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Parent/Guardian</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => (
              <tr key={student.id} className="student-row hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="px-6 py-4 font-mono text-neon-cyan text-sm text-center">{student.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center text-space-950 font-bold">
                      {student.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-neon-cyan transition-colors">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm text-center font-semibold">{student.grade}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{student.parent}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:text-neon-cyan transition-colors" title="Message"><Mail size={18} /></button>
                    <button className="p-2 hover:text-neon-blue transition-colors" title="Edit"><Edit2 size={18} /></button>
                    <button className="p-2 hover:text-red-400 transition-colors" title="Delete"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FloatingCard>
    </div>
  );
};

export default StudentManagement;
