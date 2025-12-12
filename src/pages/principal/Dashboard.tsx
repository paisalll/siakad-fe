import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import ReportGrades from './ReportGrades';
import './Principal.css';
import ReportAttendance from './ReportAttendance';

const PrincipalDashboard: React.FC = () => {
  const location = useLocation();

  // Helper untuk mengecek link aktif agar tombol berubah warna
  const isActive = (path: string) => location.pathname.includes(path) ? 'nav-btn active-link' : 'nav-btn';

  return (
    <div className="principal-container">
      <h1 className="header-title">Panel Kepala Sekolah</h1>

      {/* Navigasi Laporan */}
      <div className="report-nav">
        <Link to="/kepsek" className={location.pathname === '/kepsek' ? 'nav-btn active-link' : 'nav-btn'}>
          Ringkasan Utama
        </Link>
        <Link to="grades" className={isActive('grades')}>
          Laporan Nilai
        </Link>
        <Link to="attendance" className={isActive('attendance')}>
          Laporan Absensi
        </Link>
      </div>

      <div className="content-area">
        <Routes>
          {/* Halaman Depan (Ringkasan) */}
          <Route path="/" element={(
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Rekap Akademik</h3>
                <p>Rata-rata nilai sekolah semester ini: <strong>82.5</strong>. Tren meningkat dari tahun lalu.</p>
              </div>
              <div className="stat-card" style={{ borderLeftColor: '#27ae60' }}>
                <h3>Kehadiran Total</h3>
                <p>Persentase kehadiran siswa bulan ini: <strong>94%</strong>. Kelas 12A memiliki kehadiran tertinggi.</p>
              </div>
              <div className="stat-card" style={{ borderLeftColor: '#f39c12' }}>
                <h3>Pengumuman Aktif</h3>
                <p>3 Pengumuman aktif terkait Ujian Tengah Semester dan Libur Nasional.</p>
              </div>
            </div>
          )} />

          <Route path="grades" element={<ReportGrades />} />
          <Route path="attendance" element={<ReportAttendance />} />
        </Routes>
      </div>
    </div>
  );
};

export default PrincipalDashboard;