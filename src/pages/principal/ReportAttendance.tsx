import React from 'react';
import './Principal.css';

const ReportAttendance: React.FC = () => {
  // Dummy Data Rekap Absensi
  const attendanceData = [
    { id: 1, name: 'Ahmad Dahlan', class: '10A', present: 20, sick: 1, alpha: 0, percent: 95 },
    { id: 2, name: 'Budi Utomo', class: '10A', present: 15, sick: 2, alpha: 4, percent: 71 },
    { id: 3, name: 'Siti Walidah', class: '10A', present: 21, sick: 0, alpha: 0, percent: 100 },
  ];

  return (
    <div className="report-section">
      <h2 className="section-title">Rekapitulasi Kehadiran (Bulan Ini)</h2>
      
      <table className="report-table">
        <thead>
          <tr>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Hadir</th>
            <th>Sakit/Izin</th>
            <th>Alpa</th>
            <th>Persentase</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.class}</td>
              <td>{row.present} Hari</td>
              <td>{row.sick} Hari</td>
              <td style={{ color: row.alpha > 2 ? 'red' : 'inherit' }}>{row.alpha} Hari</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>{row.percent}%</span>
                  {/* Visual Bar Sederhana */}
                  <div style={{ width: '50px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                    <div style={{ 
                      width: `${row.percent}%`, 
                      height: '100%', 
                      background: row.percent > 80 ? '#10b981' : '#ef4444',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              </td>
              <td>
                 <span className={`badge ${row.percent > 90 ? 'badge-good' : row.percent > 75 ? 'badge-warning' : 'badge-danger'}`}>
                  {row.percent > 90 ? 'Baik' : row.percent > 75 ? 'Cukup' : 'Kurang'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportAttendance;