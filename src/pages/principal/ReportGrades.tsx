import React, { useState } from 'react';
import './Principal.css';

const ReportGrades: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('10A');

  // Dummy Data Nilai
  const gradesData = [
    { id: 1, name: 'Ahmad Dahlan', class: '10A', math: 85, eng: 88, ipa: 90, avg: 87.6 },
    { id: 2, name: 'Budi Utomo', class: '10A', math: 70, eng: 75, ipa: 72, avg: 72.3 },
    { id: 3, name: 'Ki Hajar', class: '11B', math: 90, eng: 92, ipa: 85, avg: 89.0 },
  ];

  // Filter data berdasarkan kelas yang dipilih
  const filteredData = gradesData.filter(item => item.class === selectedClass);

  return (
    <div className="report-section">
      <h2 className="section-title">Laporan Nilai Siswa</h2>
      
      <div className="filter-bar">
        <label>Pilih Kelas:</label>
        <select 
          className="filter-select"
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10A">Kelas 10A</option>
          <option value="11B">Kelas 11B</option>
        </select>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Matematika</th>
            <th>B. Inggris</th>
            <th>IPA</th>
            <th>Rata-rata</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? filteredData.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.math}</td>
              <td>{student.eng}</td>
              <td>{student.ipa}</td>
              <td style={{ fontWeight: 'bold' }}>{student.avg}</td>
              <td>
                {/* Logic sederhana untuk badge status */}
                <span className={`badge ${student.avg >= 75 ? 'badge-good' : 'badge-danger'}`}>
                  {student.avg >= 75 ? 'Lulus' : 'Remedial'}
                </span>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={7} style={{textAlign: 'center'}}>Data tidak ditemukan untuk kelas ini.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportGrades;