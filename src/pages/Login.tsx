import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import file CSS di sini

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
      setError('ID & Password Salah');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">SIAKAD Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label className="form-label">ID / NIP / NIS</label>
          <input 
            type="text" 
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="form-group mb-large">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn-submit">
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;