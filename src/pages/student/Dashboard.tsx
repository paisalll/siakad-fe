import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Siswa</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-semibold">Nilai</h2>
          <p>Lihat nilai harian, UTS, dan UAS.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-semibold">Absensi</h2>
          <p>Lihat rekap kehadiran dan ketidakhadiran.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
