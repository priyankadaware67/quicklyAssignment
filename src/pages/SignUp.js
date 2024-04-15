import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      alert("Passwords don't match")
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters long' });
      alert("Password must be at least 6 characters long")
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrors({ email: 'Invalid email format' });
      alert("Invalid email format")
      return;
    }

    try {
      const response = await axios.post(
        'https://api-dev.quicklyinc.com/auth/signup',
        {
          user: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
          },

          // the below data is static 
          company: {
            activity: {
              early_pay_intent: true,
              expected_activity: "Get my invoices paid early"
            },
            early_pay_intent: true,
            industry: { value: "Apps", label: "Apps" },
            business_type: {
              label: "Digital products",
              value: "Digital products"
            },
            website: "",
            business_registration: "corporation",
            phone: "4035550987",
            business_number: "654987321",
            has_trade_name: false,
            legal_name: formData.firstName + formData.lastName + "Co",
            expected_activity: "Get my invoices paid early"
          }
          
          
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Signup successful', response.data);
      navigate('/signin')
    } catch (error) {
      console.error('Signup failed', error);
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
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border outline-none  p-2 rounded-md"
            />
            {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border outline-none  p-2 rounded-md"
            />
            {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border outline-none  p-2 rounded-md"
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded-md text-white">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
