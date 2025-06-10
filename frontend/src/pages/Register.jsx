import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { api } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    register: false,
  });

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    if (!email) return toast.error('Enter email first');
    if (cooldown > 0) return toast.error(`Wait ${cooldown} seconds`);

    setLoading(prev => ({ ...prev, sendOtp: true }));
    try {
      const res = await api.post('/api/user/registerotp', { email });
      if (res.data.success) {
        toast.info(res.data.message);
        setCooldown(30);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(prev => ({ ...prev, sendOtp: false }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error('Enter OTP first');
    setLoading(prev => ({ ...prev, verifyOtp: true }));
    try {
      const res = await api.post('/api/user/verifyotp', { email, otp, type: 'register' });
      if (res.data.success) {
        setIsVerified(true);
        toast.success('Email verified');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(prev => ({ ...prev, verifyOtp: false }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isVerified) return toast.error('Please verify your email first');

    setLoading(prev => ({ ...prev, register: true }));
    try {
      await api.post('/api/user/register', { name, email, password });
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(prev => ({ ...prev, register: false }));
    }
  };

  return (
    <div className='grid place-items-center h-screen bg-[#f8f8f8]'>
      <form
        onSubmit={handleRegister}
        className='w-[90%] sm:w-[400px] bg-white p-8 rounded shadow-md grid gap-4'
      >
        <h2 className='text-3xl font-semibold text-center text-gray-700'>REGISTER HERE</h2>

        <input
          type='text'
          placeholder='Enter name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={loading.register}
          className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50'
        />

        <input
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading.register || loading.sendOtp || loading.verifyOtp}
          className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50'
        />

        <div className='grid gap-2'>
          <input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={e => setOtp(e.target.value)}
            disabled={isVerified || loading.verifyOtp || loading.register}
            maxLength={6}
            className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50'
          />

          <div className='flex justify-between text-sm'>
            <button
              type='button'
              onClick={handleSendOtp}
              disabled={cooldown > 0 || isVerified || loading.sendOtp}
              className={`text-blue-600 hover:underline ${
                cooldown > 0 || loading.sendOtp ? 'text-gray-400 cursor-not-allowed' : ''
              }`}
            >
              {loading.sendOtp
                ? 'Sending...'
                : cooldown > 0
                ? `Send OTP (${cooldown}s)`
                : 'Send OTP'}
            </button>

            <button
              type='button'
              onClick={handleVerifyOtp}
              disabled={isVerified || loading.verifyOtp}
              className='text-blue-600 hover:underline'
            >
              {loading.verifyOtp ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </div>

        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading.register}
          className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50'
        />

        <button
          type='submit'
          disabled={loading.register}
          className='bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50'
        >
          {loading.register ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className='text-sm text-center'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='text-blue-600 hover:underline cursor-pointer'
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
