import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard.tsx';
// import AdminDashboard from './pages/admin/Dashboard';
// import PrincipalDashboard from './pages/principal/Dashboard';
import Login from './pages/Login.tsx';
import type { JSX } from 'react';

// Helper sederhana untuk proteksi route
const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: string }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/" />;
  if (role !== allowedRole) return <Navigate to="/" />; // Redirect jika salah role
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Route Siswa */}
        <Route path="/siswa/*" element={
          <ProtectedRoute allowedRole="SISWA">
            <div></div>
            {/* <StudentDashboard /> */}
          </ProtectedRoute>
        } />

        {/* Route Guru */}
        <Route path="/guru/*" element={
          <ProtectedRoute allowedRole="GURU">
            <TeacherDashboard />
          </ProtectedRoute>
        } />

        {/* Route Admin */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRole="ADMIN">
            <div></div>
            {/* <AdminDashboard /> */}
          </ProtectedRoute>
        } />
        
        {/* Route Kepsek */}
        <Route path="/kepsek/*" element={
          <ProtectedRoute allowedRole="KEPSEK">
            {/* <PrincipalDashboard /> */}
            <div></div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;