import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { CreditCard, DollarSign, Download, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const FeesManagement = () => {
  useEffect(() => {
    anime({
      targets: '.fee-card',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  const transactions = [
    { id: 'TXN-9021', student: 'Nova Skye', amount: '$1,200', date: '24 Apr 2026', method: 'Nano-Transfer', status: 'Paid' },
    { id: 'TXN-9022', student: 'Orion Pax', amount: '$1,200', date: '22 Apr 2026', method: 'Crypto-Pay', status: 'Paid' },
    { id: 'TXN-9023', student: 'Lyra Vance', amount: '$450', date: '20 Apr 2026', method: 'Direct Credits', status: 'Pending' },
    { id: 'TXN-9024', student: 'Atlas Thorne', amount: '$1,200', date: '19 Apr 2026', method: 'Nano-Transfer', status: 'Paid' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Financial Nexus</h1>
          <p className="text-slate-400 font-medium">Securing and monitoring academic credit flow across the institution.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neon-violet/20 border border-neon-violet/50 text-neon-violet rounded-xl hover:bg-neon-violet hover:text-white transition-all duration-300 font-bold">
          <Download size={20} />
          EXPORT LEDGER
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <FloatingCard className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Settled</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Revenue</h3>
          <div className="text-3xl font-bold text-white mb-4">$1.42M</div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[92%] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
          </div>
        </FloatingCard>

        <FloatingCard className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400">
              <AlertTriangle size={20} />
            </div>
            <span className="text-[10px] font-bold text-yellow-400 uppercase">Pending</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Outstanding</h3>
          <div className="text-3xl font-bold text-white mb-4">$84,300</div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 w-[15%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          </div>
        </FloatingCard>

        <FloatingCard className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-red-400/20 text-red-400">
              <AlertTriangle size={20} />
            </div>
            <span className="text-[10px] font-bold text-red-400 uppercase">Critical</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Defaulters</h3>
          <div className="text-3xl font-bold text-white mb-4">12 Students</div>
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <AlertTriangle size={12} /> Priority action required
          </p>
        </FloatingCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FloatingCard className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Live Transaction Stream</h3>
          </div>
          <div className="p-0">
            {transactions.map((txn, i) => (
              <div key={txn.id} className="fee-card flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${txn.status === 'Paid' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">{txn.student}</div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">{txn.id} • {txn.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{txn.amount}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${txn.status === 'Paid' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    {txn.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest">
            View All Transactions
          </button>
        </FloatingCard>

        <FloatingCard className="h-fit">
          <h3 className="text-lg font-bold text-white mb-6">Payment Links</h3>
          <div className="space-y-4">
            {[
              { label: 'Academic Year 2026-27', price: '$4,500' },
              { label: 'Space Camp Expedition', price: '$850' },
              { label: 'Cyber-Shield Subscription', price: '$120' },
            ].map((link, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 hover:border-neon-cyan/30 bg-white/5 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-white font-medium group-hover:text-neon-cyan transition-colors">{link.label}</span>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-neon-cyan transition-colors" />
                </div>
                <div className="text-lg font-bold text-neon-cyan">{link.price}</div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold uppercase tracking-widest hover:bg-neon-cyan hover:text-space-950 transition-all">Copy Link</button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default FeesManagement;
