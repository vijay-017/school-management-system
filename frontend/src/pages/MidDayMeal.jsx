import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { 
  UtensilsCrossed, 
  TrendingDown, 
  Package, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  PieChart
} from 'lucide-react';
import FloatingCard from '../components/FloatingCard';

const MidDayMeal = () => {
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    // Entry animation
    anime({
      targets: '.meal-stagger',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1200
    });

    // Stock bars animation
    anime({
      targets: '.stock-bar',
      width: (el) => el.dataset.width + '%',
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: 500
    });
  }, []);

  const mealStats = [
    { label: 'Prepared Today', value: '1,150', color: 'text-neon-cyan', icon: UtensilsCrossed },
    { label: 'Meals Served', value: '1,084', color: 'text-emerald-400', icon: CheckCircle2 },
    { label: 'Remaining', value: '66', color: 'text-neon-violet', icon: TrendingDown },
    { label: 'Present Students', value: '1,092', color: 'text-neon-blue', icon: Package },
  ];

  const inventory = [
    { item: 'Rice Stock', level: 85, unit: 'kg', status: 'Optimal', color: 'bg-neon-cyan' },
    { item: 'Vegetables', level: 42, unit: 'kg', status: 'Needs Refill', color: 'bg-orange-400' },
    { item: 'Cooking Oil', level: 12, unit: 'L', status: 'Critical', color: 'bg-red-500' },
  ];

  const weeklyMenu = [
    { day: 'Monday', meal: 'Steam Rice, Dal, Mixed Veg', calories: '450 kcal' },
    { day: 'Tuesday', meal: 'Jeera Rice, Paneer Curry', calories: '520 kcal' },
    { day: 'Wednesday', meal: 'Khichdi, Roasted Veg', calories: '480 kcal' },
    { day: 'Thursday', meal: 'Rice, Soya Chunks Curry', calories: '500 kcal' },
    { day: 'Friday', meal: 'Vegetable Pulao, Curd', calories: '460 kcal' },
    { day: 'Saturday', meal: 'Rice, Egg Curry / Special Veg', calories: '550 kcal' },
  ];

  return (
    <div className="p-8">
      <header className="mb-10 meal-stagger">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-2xl bg-neon-cyan/20 border border-neon-cyan/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <UtensilsCrossed className="text-neon-cyan" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white neon-text">Meal Management</h1>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold opacity-70">Sustenance Monitoring System</p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {mealStats.map((stat, i) => (
          <FloatingCard key={i} className="meal-stagger group overflow-hidden" delay={i * 0.2}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-cyan/50 transition-all`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Live Sync</div>
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className={`text-3xl font-bold text-white`}>{stat.value}</div>
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={80} />
            </div>
          </FloatingCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory & Stock */}
        <div className="space-y-6">
          <FloatingCard className="meal-stagger border-neon-cyan/20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="text-neon-cyan" size={20} />
              Resource Stock
            </h2>
            <div className="space-y-6">
              {inventory.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-slate-300">{item.item}</span>
                    <span className={`text-[10px] font-bold uppercase ${item.level < 20 ? 'text-red-400 animate-pulse' : 'text-slate-500'}`}>
                      {item.level}% Remaining
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`stock-bar h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] ${item.color}`}
                      data-width={item.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>{item.unit} capacity</span>
                    <span className={item.level < 20 ? 'text-red-400 font-bold' : ''}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>

          <FloatingCard className="meal-stagger bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-orange-400" size={24} />
              <h3 className="text-lg font-bold text-white">System Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-400/5 border border-orange-400/10 flex gap-3 group hover:bg-orange-400/10 transition-all cursor-pointer">
                <div className="w-1.5 h-full bg-orange-400 rounded-full group-hover:shadow-[0_0_10px_rgba(251,146,60,0.8)] transition-all"></div>
                <div>
                  <p className="text-sm text-white font-medium">Stock Threshold Reached</p>
                  <p className="text-xs text-slate-400 mt-1">Cooking oil critical level (12L). Immediate requisition required.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/10 flex gap-3 group hover:bg-red-400/10 transition-all cursor-pointer">
                <div className="w-1.5 h-full bg-red-400 rounded-full group-hover:shadow-[0_0_10px_rgba(248,113,113,0.8)] transition-all"></div>
                <div>
                  <p className="text-sm text-white font-medium">Quality Audit Missing</p>
                  <p className="text-xs text-slate-400 mt-1">Daily taste-test signature pending for Grade 12 sector.</p>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Distribution & Table */}
        <div className="lg:col-span-2 space-y-6">
          <FloatingCard className="meal-stagger p-0 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PieChart className="text-neon-cyan" size={20} />
                Distribution Log
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400 font-bold hover:bg-white/10 transition-all uppercase">Week</button>
                <button className="px-3 py-1 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 text-[10px] text-neon-cyan font-bold transition-all uppercase shadow-[0_0_10px_rgba(34,211,238,0.2)]">Today</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Day / Sector</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meals (P)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Served</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Wastage</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { day: 'Block A (Primary)', p: 450, s: 442, w: '2%', status: 'Stable' },
                    { day: 'Block B (Secondary)', p: 400, s: 395, w: '1%', status: 'Optimal' },
                    { day: 'Block C (Higher)', p: 300, s: 247, w: '18%', status: 'Alert' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-all group cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="text-sm text-white font-medium group-hover:text-neon-cyan transition-colors">{row.day}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-mono">{row.p}</td>
                      <td className="px-6 py-4 text-sm text-slate-300 font-mono">{row.s}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-bold ${row.w === '18%' ? 'text-red-400' : 'text-emerald-400'}`}>{row.w}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border ${
                          row.status === 'Optimal' ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400' :
                          row.status === 'Alert' ? 'bg-red-400/10 border-red-400/20 text-red-400' :
                          'bg-white/5 border-white/10 text-slate-400'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FloatingCard>

          {/* Menu Planner */}
          <FloatingCard className="meal-stagger border-neon-violet/20 bg-gradient-to-br from-neon-violet/5 to-transparent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UtensilsCrossed className="text-neon-violet" size={20} />
                Weekly Trajectory
              </h2>
              <button className="px-4 py-2 rounded-xl bg-neon-violet/20 border border-neon-violet/40 text-neon-violet text-[10px] font-bold uppercase tracking-widest hover:bg-neon-violet hover:text-white transition-all">
                Modify Schedule
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklyMenu.map((day, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    activeDay === i ? 'bg-neon-violet/10 border-neon-violet shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setActiveDay(activeDay === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">{day.day}</span>
                    {activeDay === i ? <ChevronUp size={16} className="text-neon-violet" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${activeDay === i ? 'max-h-24 mt-4' : 'max-h-0'}`}>
                    <p className="text-sm text-neon-violet font-medium">{day.meal}</p>
                    <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-widest">{day.calories} target</p>
                  </div>
                  {activeDay !== i && (
                    <p className="text-xs text-slate-500 mt-2 truncate italic">{day.meal}</p>
                  )}
                </div>
              ))}
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
};

export default MidDayMeal;
