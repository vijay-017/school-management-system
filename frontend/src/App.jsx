import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import StudentManagement from './pages/StudentManagement';
import TeacherManagement from './pages/TeacherManagement';
import AttendancePage from './pages/AttendancePage';
import FeesManagement from './pages/FeesManagement';
import ClassesPage from './pages/ClassesPage';
import ParentDashboard from './pages/ParentDashboard';
import ResultsPage from './pages/ResultsPage';
import MidDayMeal from './pages/MidDayMeal';
import StudentFilter from './pages/StudentFilter';

// Placeholder Pages
const Placeholder = ({ title }) => (
  <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
    <h1 className="text-4xl font-bold text-white mb-4 neon-text">{title}</h1>
    <p className="text-slate-400">This module is currently being calibrated in the anti-gravity chamber.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="student-filter" element={<StudentFilter />} />
          <Route path="teachers" element={<TeacherManagement />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="fees" element={<FeesManagement />} />
          <Route path="meals" element={<MidDayMeal />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<AdminLayout role="parent" />}>
          <Route index element={<ParentDashboard />} />
          <Route path="child" element={<Placeholder title="Child Profile" />} />
          <Route path="attendance" element={<Placeholder title="Attendance" />} />
          <Route path="marks" element={<Placeholder title="Marks" />} />
          <Route path="fees" element={<Placeholder title="Fees" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
