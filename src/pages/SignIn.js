import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setErrors({ email: 'Invalid email format' });
      alert("Invalid email format")
      return;
    }

    
    if (formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters long' });
      alert("Password must be at least 6 characters long")
      return;
    }
    try {
      const response = await axios.post(
        'https://api-dev.quicklyinc.com/auth/login',
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Signin successful', response.data);
      localStorage.setItem('token',response.data.token);
      navigate('/profile')
      // Handle successful signin, e.g., redirect to profile page
    } catch (error) {
      console.error('Signin failed', error);
      navigate('/nopage')
      // Handle signin error, e.g., display error message
    }
  };
  const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border outline-none  p-2 rounded-md"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border outline-none  p-2 rounded-md"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
          <div className="flex justify-center">
          <button type="submit" className="px-4 py-2 bg-blue-500 rounded-md text-white">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
