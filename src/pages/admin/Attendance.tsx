import React, { useState } from 'react';
import './Dashboard.css';

interface AttendanceRecord {
  id: number;
  name: string;
  role: 'SISWA' | 'GURU';
  date: string;
  status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA';
}

const Attendance: React.FC = () => {
  // 1. Data Dummy
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([
    { id: 1, name: 'Budi Santoso', role: 'SISWA', date: '2023-10-25', status: 'HADIR' },
    { id: 2, name: 'Pak Guru Matematika', role: 'GURU', date: '2023-10-25', status: 'SAKIT' },
  ]);

  // 2. Form State
  const [form, setForm] = useState({
    id: 0,
    name: '',
    role: 'SISWA',
    date: '',
    status: 'HADIR'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle Change untuk Input & Select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE & UPDATE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date) return alert("Nama dan Tanggal wajib diisi");

    if (isEditing) {
      setAttendanceList(prev => prev.map(item => item.id === form.id ? { ...item, ...form } as AttendanceRecord : item));
      setIsEditing(false);
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        name: form.name,
        role: form.role as 'SISWA' | 'GURU',
        date: form.date,
        status: form.status as 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA'
      };
      setAttendanceList([...attendanceList, newRecord]);
    }
    setForm({ id: 0, name: '', role: 'SISWA', date: '', status: 'HADIR' });
  };

  // DELETE
  const handleDelete = (id: number) => {
    if (window.confirm('Hapus data absensi ini?')) {
      setAttendanceList(prev => prev.filter(item => item.id !== id));
    }
  };

  // Edit Trigger
  const handleEdit = (record: AttendanceRecord) => {
    setForm({ ...record });
    setIsEditing(true);
  };

  return (
    <div>
      <h2 className="card-title">Manajemen Absensi</h2>

      <form onSubmit={handleSubmit} className="crud-form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Nama</label>
            <input name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Nama..." />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="form-select">
              <option value="SISWA">Siswa</option>
              <option value="GURU">Guru</option>
            </select>
          </div>
        </div>
        <div className="form-row">
           <div className="form-group">
            <label>Tanggal</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="form-select">
              <option value="HADIR">Hadir</option>
              <option value="IZIN">Izin</option>
              <option value="SAKIT">Sakit</option>
              <option value="ALPA">Alpa</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-sm btn-green" style={{ width: '100%', padding: '10px' }}>
          {isEditing ? 'Update Absen' : 'Catat Absen'}
        </button>
        {isEditing && (
             <button type="button" onClick={() => { setIsEditing(false); setForm({ id: 0, name: '', role: 'SISWA', date: '', status: 'HADIR' }); }} className="btn-sm btn-gray" style={{ width: '100%', marginTop: '5px' }}>
             Batal
           </button>
        )}
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Role</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>
                <span style={{ 
                  backgroundColor: item.role === 'GURU' ? '#e0f2fe' : '#fef3c7', 
                  padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' 
                }}>
                  {item.role}
                </span>
              </td>
              <td style={{ fontWeight: 'bold', color: item.status === 'ALPA' ? 'red' : 'green' }}>{item.status}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(item)} className="btn-sm btn-blue">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn-sm btn-red">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;