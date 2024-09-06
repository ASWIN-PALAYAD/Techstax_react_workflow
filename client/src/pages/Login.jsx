
import  { useState } from 'react';
import '../styles/register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, formData,{
        withCredentials:true
      });
      alert('logged successfully');
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main_container'>
      <div className="login-container">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>Dont have an Account ? <Link to={'/register'}> Register here </Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
