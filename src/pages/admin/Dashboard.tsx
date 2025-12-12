import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Grades from './Grades';
import Attendance from './Attendance';
import './Dashboard.css'; // Import CSS

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-container">
      <h1 className="page-title">Panel Admin</h1>

      <div className="nav-container">
        <Link to="grades" className="nav-link btn-blue">Kelola Nilai</Link>
        <Link to="attendance" className="nav-link btn-green">Kelola Absen</Link>
        <Link to="/admin" className="nav-link btn-gray">Dashboard Utama</Link>
      </div>

      <div className="content-area">
        <Routes>
          <Route path="/" element={(
            <div className="dashboard-grid">
              <div className="card">
                <h2 className="card-title">Manajemen Pengguna</h2>
                <p>Tambah / edit / hapus akun guru dan siswa.</p>
              </div>

              <div className="card">
                <h2 className="card-title">Konfigurasi</h2>
                <p>Pengaturan sistem dan akses modul.</p>
              </div>
            </div>
          )} />

          <Route path="grades" element={<Grades />} />
          <Route path="attendance" element={<Attendance />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;