import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { Mail, Phone, Book, MoreHorizontal } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const TeacherCard = ({ name, subject, contact, image, delay }) => (
  <FloatingCard className="flex flex-col items-center text-center p-8 group hover:scale-[1.05] transition-all duration-500" delay={delay}>
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <div className="w-24 h-24 rounded-full border-2 border-neon-cyan/50 p-1 relative z-10">
        <img src={image} alt={name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="absolute -bottom-2 -right-2 bg-neon-cyan text-space-950 p-1.5 rounded-lg font-bold text-[10px] uppercase shadow-[0_0_10px_rgba(34,211,238,0.5)]">
        {subject.split(' ')[0]}
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">{name}</h3>
    <p className="text-neon-cyan/80 text-sm font-medium mb-6 uppercase tracking-wider">{subject}</p>
    
    <div className="w-full space-y-3 mb-6">
      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
        <Mail size={14} className="text-neon-cyan" />
        {contact.email}
      </div>
      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
        <Phone size={14} className="text-neon-cyan" />
        {contact.phone}
      </div>
    </div>

    <div className="flex gap-2 w-full">
      <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors">
        PROFILE
      </button>
      <button className="px-3 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-space-950 transition-all">
        <Mail size={16} />
      </button>
    </div>
  </FloatingCard>
);

const TeacherManagement = () => {
  useEffect(() => {
    anime({
      targets: '.teacher-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  const teachers = [
    { name: 'Dr. Alaric Chen', subject: 'Quantum Physics', contact: { email: 'alaric@aetheris.edu', phone: '+1 234 567 890' }, image: 'https://i.pravatar.cc/150?u=alaric' },
    { name: 'Prof. Sarah Vance', subject: 'Advanced Mathematics', contact: { email: 'sarah@aetheris.edu', phone: '+1 234 567 891' }, image: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Elena Rodriguez', subject: 'Astro-Biology', contact: { email: 'elena@aetheris.edu', phone: '+1 234 567 892' }, image: 'https://i.pravatar.cc/150?u=elena' },
    { name: 'James Sterling', subject: 'Cyber Ethics', contact: { email: 'james@aetheris.edu', phone: '+1 234 567 893' }, image: 'https://i.pravatar.cc/150?u=james' },
    { name: 'Maya Kotto', subject: 'Galactic History', contact: { email: 'maya@aetheris.edu', phone: '+1 234 567 894' }, image: 'https://i.pravatar.cc/150?u=maya' },
    { name: 'Viktor Drago', subject: 'Physical Training', contact: { email: 'viktor@aetheris.edu', phone: '+1 234 567 895' }, image: 'https://i.pravatar.cc/150?u=viktor' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Faculty Council</h1>
          <p className="text-slate-400">Reviewing performance and assignments of 86 academic staff members.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active</p>
              <p className="text-xl font-bold text-emerald-400">82</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">On Leave</p>
              <p className="text-xl font-bold text-yellow-400">4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher, i) => (
          <div key={i} className="teacher-card">
            <TeacherCard {...teacher} delay={i * 0.2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherManagement;
