// src/Auth/LoginSignup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext'; // Update the import path
import { useDispatch } from 'react-redux';
import { setToken as setReduxToken } from '../../store/UsersSlice'; // If you still need to use Redux

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, user, login } = useAuth(); // Destructure from AuthContext
  const dispatch = useDispatch();

  // Check if user is already logged in
  useEffect(() => {
    if (token && user) {
      navigate('/');
    }
  }, [token, user, navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);
    console.log('Name:', fullName.trim().toLowerCase());
    try {
      const endpoint = isLogin
        ? 'http://localhost:3001/api/users/login'
        : 'http://localhost:3001/api/users/signup';
      const payload = isLogin
        ? { email, password }
        : { email, password, fullName, username: fullName.trim().toLowerCase() };

      const response = await axios.post(endpoint, payload);

      if (isLogin) {
        // For login, response should include token and user data
        const { token, user } = response.data;
        login(token, user);
        dispatch(setReduxToken(token)); // If you still want to set Redux token
      } else {
        // For signup, you might want to log the user in automatically
        const { token, user } = response.data;
        login(token, user);
        dispatch(setReduxToken(token)); // If you still want to set Redux token
      }

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      alert(
        error.response?.data?.message ||
          `${isLogin ? 'Login' : 'Signup'} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-hero-pattern bg-cover bg-center">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-3xl mx-5 lg:mx-auto flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-primary bg-opacity-90 text-white">
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? 'Welcome Back' : 'Join AgriLink'}
          </h2>
          <p className="text-center mb-6">
            {isLogin
              ? 'Login to explore the best agricultural products and connect with farmers.'
              : 'Create an account to connect with top farmers and get the best deals.'}
          </p>
          <button
            className="flex items-center gap-3 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-accent hover:text-green-700 transition-colors"
            onClick={() => alert('Google login not implemented')}
          >
            <FaGoogle size={20} />
            Sign {isLogin ? 'In' : 'Up'} with Google
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 bg-white">
          <h3 className="text-3xl font-semibold text-green-600 mb-5 text-center">
            {isLogin ? 'Login to your account' : 'Create your account'}
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-green-600'
              } hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors`}
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center mt-8">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={handleToggle}
              className="text-green-600 font-semibold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
