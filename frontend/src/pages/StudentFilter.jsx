import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Users, Filter, X } from 'lucide-react';
import { mockStudents, classes, sections } from '../data/mockStudents';

const StudentFilter = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const gridRef = useRef(null);
  const filterPanelRef = useRef(null);

  // Initial anti-gravity animation for filter panel
  useEffect(() => {
    anime({
      targets: filterPanelRef.current,
      translateY: ['-6px', '6px'],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3000
    });
  }, []);

  // Filtering logic & animations
  useEffect(() => {
    if (!selectedClass && !selectedSection) {
      setFilteredStudents([]);
      return;
    }

    const filterData = () => {
      const results = mockStudents.filter(student => {
        const classMatch = selectedClass ? student.class === selectedClass : true;
        const sectionMatch = selectedSection ? student.section === selectedSection : true;
        return classMatch && sectionMatch;
      });
      setFilteredStudents(results);
      
      // Entry animation for new cards
      setTimeout(() => {
        anime({
          targets: '.student-card',
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeOutExpo',
          duration: 800
        });
        setIsFiltering(false);
      }, 50);
    };

    if (filteredStudents.length > 0) {
      setIsFiltering(true);
      // Fade out old cards first
      anime({
        targets: '.student-card',
        translateY: [0, -20],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInExpo',
        complete: filterData
      });
    } else {
      filterData();
    }
  }, [selectedClass, selectedSection]);

  // Anti-gravity loop for cards (starts after entry animation)
  useEffect(() => {
    if (filteredStudents.length > 0 && !isFiltering) {
      anime({
        targets: '.student-card',
        translateY: ['-3px', '3px'],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 2500,
        delay: anime.stagger(50)
      });
    }
  }, [filteredStudents, isFiltering]);

  const clearFilters = () => {
    setSelectedClass('');
    setSelectedSection('');
  };

  return (
    <div className="p-6 md:p-8 min-h-screen relative overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 neon-text flex items-center gap-3">
          <Users className="text-neon-cyan" />
          Student Filter
        </h1>
        <p className="text-slate-400">Dynamically filter and view students across dimensions.</p>
      </div>

      {/* Filter Panel */}
      <div 
        ref={filterPanelRef}
        className="glass-card p-6 mb-10 max-w-3xl relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 w-full">
            <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Select Class</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all duration-300 hover:bg-slate-800/50"
              >
                <option value="">All Classes</option>
                {classes.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={16} />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-slate-300 text-sm font-medium mb-2 ml-1">Select Section</label>
            <div className="relative">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all duration-300 hover:bg-slate-800/50"
              >
                <option value="">All Sections</option>
                {sections.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={16} />
              </div>
            </div>
          </div>

          {(selectedClass || selectedSection) && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 w-full md:w-auto"
            >
              <X size={18} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Student Grid Area */}
      <div ref={gridRef} className="min-h-[400px] relative z-0">
        {!selectedClass && !selectedSection ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 anti-gravity">
              <Filter size={32} className="text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg">Select a class and section to view students.</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 anti-gravity">
              <Users size={32} className="text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg">No students found in this section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className="student-card opacity-0 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-default group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl border border-white/10 group-hover:border-neon-cyan/30 transition-colors">
                    {student.avatar}
                  </div>
                  <div className="bg-slate-900/60 px-3 py-1 rounded-full text-xs font-mono text-neon-cyan border border-neon-cyan/20">
                    #{student.rollNumber}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                  {student.name}
                </h3>
                
                <div className="flex gap-2 mt-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Class {student.class}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Section {student.section}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFilter;
