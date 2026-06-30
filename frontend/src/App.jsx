import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

// Auth
import LoginPage from './pages/LoginPage';

// Role Dashboards
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';

// Admin sub-pages (existing)
import StudentManagement from './pages/StudentManagement';
import TeacherManagement from './pages/TeacherManagement';
import AttendancePage from './pages/AttendancePage';
import FeesManagement from './pages/FeesManagement';
import ClassesPage from './pages/ClassesPage';
import ResultsPage from './pages/ResultsPage';
import MidDayMeal from './pages/MidDayMeal';
import StudentFilter from './pages/StudentFilter';

// Generic placeholder for unbuilt pages
const Placeholder = ({ title }) => (
  <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
    <h1 className="text-4xl font-bold text-white mb-4 neon-text">{title}</h1>
    <p className="text-slate-400">This module is currently being calibrated in the anti-gravity chamber.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ── Admin / Super-Admin Dashboard ── */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="students"       element={<StudentManagement />} />
            <Route path="student-filter" element={<StudentFilter />} />
            <Route path="teachers"       element={<TeacherManagement />} />
            <Route path="parents"        element={<Placeholder title="Parent Management" />} />
            <Route path="classes"        element={<ClassesPage />} />
            <Route path="subjects"       element={<Placeholder title="Subjects" />} />
            <Route path="attendance"     element={<AttendancePage />} />
            <Route path="exams"          element={<Placeholder title="Exams" />} />
            <Route path="marks"          element={<ResultsPage />} />
            <Route path="timetable"      element={<Placeholder title="Timetable" />} />
            <Route path="users"          element={<Placeholder title="User Management" />} />
            <Route path="fees"           element={<FeesManagement />} />
            <Route path="meals"          element={<MidDayMeal />} />
          </Route>

          {/* ── Teacher Dashboard ── */}
          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute allowedRoles={['TEACHER']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="classes"    element={<Placeholder title="My Classes" />} />
            <Route path="attendance" element={<Placeholder title="Mark Attendance" />} />
            <Route path="marks"      element={<Placeholder title="Enter Marks" />} />
            <Route path="timetable"  element={<Placeholder title="My Timetable" />} />
          </Route>

          {/* ── Parent Dashboard ── */}
          <Route
            path="/dashboard/parent"
            element={
              <ProtectedRoute allowedRoles={['PARENT']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ParentDashboard />} />
            <Route path="attendance" element={<Placeholder title="Child's Attendance" />} />
            <Route path="marks"      element={<Placeholder title="Child's Marks" />} />
            <Route path="timetable"  element={<Placeholder title="Child's Timetable" />} />
          </Route>

          {/* Legacy redirects → new paths */}
          <Route path="/admin/*"  element={<Navigate to="/dashboard/admin"  replace />} />
          <Route path="/parent/*" element={<Navigate to="/dashboard/parent" replace />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
