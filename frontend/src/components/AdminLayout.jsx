import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-space-950">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen relative">
        {/* Background Glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-neon-violet/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
