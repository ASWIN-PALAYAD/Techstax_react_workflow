import  { useState } from 'react';
import '../styles/register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, formData,{
        withCredentials:true
      });
      alert('user registered successfully');
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main_container'>
      <div className="login-container">
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Register</button>
          <p>Already have account ? <Link to={'/login'}> Login here </Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
