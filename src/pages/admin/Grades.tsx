import React, { useState } from 'react';
import './Dashboard.css';

interface Grade {
  id: number;
  studentName: string;
  subject: string;
  score: number;
}

const Grades: React.FC = () => {
  // 1. State untuk Data List
  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, studentName: 'Budi Santoso', subject: 'Matematika', score: 85 },
    { id: 2, studentName: 'Siti Aminah', subject: 'Bahasa Inggris', score: 92 },
  ]);

  // 2. State untuk Form Input
  const [form, setForm] = useState({ id: 0, studentName: '', subject: '', score: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE & UPDATE Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.studentName || !form.subject || !form.score) return alert("Semua data wajib diisi");

    if (isEditing) {
      // Logic Update
      setGrades(grades.map(g => (g.id === form.id ? { ...g, score: Number(form.score), studentName: form.studentName, subject: form.subject } : g)));
      setIsEditing(false);
    } else {
      // Logic Create
      const newGrade: Grade = {
        id: Date.now(),
        studentName: form.studentName,
        subject: form.subject,
        score: Number(form.score),
      };
      setGrades([...grades, newGrade]);
    }
    setForm({ id: 0, studentName: '', subject: '', score: '' }); // Reset Form
  };

  // DELETE Logic
  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus nilai ini?')) {
      setGrades(grades.filter(g => g.id !== id));
    }
  };

  // EDIT Trigger
  const handleEdit = (grade: Grade) => {
    setForm({ 
      id: grade.id, 
      studentName: grade.studentName, 
      subject: grade.subject, 
      score: grade.score.toString() 
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h2 className="card-title">Manajemen Nilai Siswa</h2>
      
      {/* Form Input */}
      <form onSubmit={handleSubmit} className="crud-form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Nama Siswa</label>
            <input name="studentName" value={form.studentName} onChange={handleChange} className="form-input" placeholder="Nama..." />
          </div>
          <div className="form-group">
            <label>Mata Pelajaran</label>
            <input name="subject" value={form.subject} onChange={handleChange} className="form-input" placeholder="Mapel..." />
          </div>
          <div className="form-group">
            <label>Nilai (0-100)</label>
            <input type="number" name="score" value={form.score} onChange={handleChange} className="form-input" placeholder="0" />
          </div>
        </div>
        <button type="submit" className="btn-sm btn-blue" style={{ width: '100%', padding: '10px' }}>
          {isEditing ? 'Update Nilai' : 'Simpan Nilai'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => { setIsEditing(false); setForm({ id: 0, studentName: '', subject: '', score: '' }); }} className="btn-sm btn-gray" style={{ width: '100%', marginTop: '5px' }}>
            Batal
          </button>
        )}
      </form>

      {/* Tabel Data */}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Siswa</th>
            <th>Mata Pelajaran</th>
            <th>Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.id}</td>
              <td>{grade.studentName}</td>
              <td>{grade.subject}</td>
              <td>{grade.score}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(grade)} className="btn-sm btn-blue">Edit</button>
                <button onClick={() => handleDelete(grade.id)} className="btn-sm btn-red">Hapus</button>
              </td>
            </tr>
          ))}
          {grades.length === 0 && <tr><td colSpan={5} style={{textAlign:'center'}}>Belum ada data nilai.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;