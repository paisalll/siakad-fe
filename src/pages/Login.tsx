import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Menghubungi API NestJS
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });

      const { access_token, role } = response.data;
      
      // Simpan sesi
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);

      // Redirect sesuai Role (Flow Decision)
      switch(role) {
        case 'SISWA': navigate('/siswa'); break;
        case 'GURU': navigate('/guru'); break;
        case 'ADMIN': navigate('/admin'); break;
        case 'KEPSEK': navigate('/kepsek'); break;
        default: setError('Role tidak dikenali');
      }
    } catch (err) {
      setError('ID & Password Salah'); // Sesuai pesan error di diagram
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold text-center">SIAKAD Login</h2>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">ID / NIP / NIS</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1">Password</label>
          <input 
            type="password" 
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;