import { useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  // State untuk form input nilai
  const [gradeData, setGradeData] = useState({
    studentId: '',
    subjectId: '',
    value: 0,
    type: 'Harian'
  });

  const handleSubmitGrade = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/grades', {
        ...gradeData,
        studentId: parseInt(gradeData.studentId), // Konversi ke number
        subjectId: parseInt(gradeData.subjectId)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Nilai berhasil disubmit!');
    } catch (error) {
      alert('Gagal submit nilai');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Guru</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Kartu Input Nilai */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-semibold">Input Nilai Siswa</h2>
          
          <div className="space-y-3">
            <input 
              placeholder="ID Siswa" 
              className="w-full border p-2"
              onChange={e => setGradeData({...gradeData, studentId: e.target.value})}
            />
            <input 
              placeholder="ID Mata Pelajaran" 
              className="w-full border p-2"
              onChange={e => setGradeData({...gradeData, subjectId: e.target.value})}
            />
            <select 
              className="w-full border p-2"
              onChange={e => setGradeData({...gradeData, type: e.target.value})}
            >
              <option value="Harian">Harian</option>
              <option value="UTS">UTS</option>
              <option value="UAS">UAS</option>
            </select>
            <input 
              type="number" 
              placeholder="Nilai (0-100)" 
              className="w-full border p-2"
              onChange={e => setGradeData({...gradeData, value: parseFloat(e.target.value)})}
            />
            
            <button 
              onClick={handleSubmitGrade}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Submit Nilai
            </button>
          </div>
        </div>

        {/* Menu Lain Sesuai Diagram */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-semibold">Menu Absensi</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Absen Murid
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Lihat Jadwal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;