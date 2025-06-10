import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    register: false,
  });

  const navigate = useNavigate();
  const { api } = useContext(ShopContext);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const registersendOtp = async () => {
    if (!email) return toast.error('Please enter your email');
    if (cooldown > 0) return toast.error(`Please wait ${cooldown} seconds`);
    setIsLoading((prev) => ({ ...prev, sendOtp: true }));
    try {
      const res = await api.post('/api/user/registerotp', { email });
      if (res.data.success) {
        toast.info(res.data.message);
        setCooldown(30);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setIsLoading((prev) => ({ ...prev, sendOtp: false }));
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error('Please enter the OTP');
    setIsLoading((prev) => ({ ...prev, verifyOtp: true }));
    try {
      const res = await api.post('/api/user/verifyotp', { email, otp, type: 'register' });
      if (res.data.success) {
        setIsVerified(true);
        toast.success('Email verified');
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading((prev) => ({ ...prev, verifyOtp: false }));
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (!isVerified) return toast.error('Please verify your email first');
    setIsLoading((prev) => ({ ...prev, register: true }));
    try {
      await api.post('/api/user/register', { name, email, password });
      toast.success('Registered successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading((prev) => ({ ...prev, register: false }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={register}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500">Join us to explore more!</p>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Name"
          required
          disabled={isLoading.register}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          type="email"
          required
          disabled={isLoading.register || isLoading.sendOtp || isLoading.verifyOtp}
        />

        <div className="space-y-2">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter OTP"
            type="text"
            maxLength={6}
            disabled={isVerified || isLoading.verifyOtp || isLoading.register}
          />
          <div className="flex justify-between items-center text-sm">
            <button
              type="button"
              onClick={registersendOtp}
              disabled={cooldown > 0 || isVerified || isLoading.sendOtp}
              className={`flex items-center gap-2 ${
                cooldown > 0 || isLoading.sendOtp
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:underline'
              }`}
            >
              {isLoading.sendOtp ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : cooldown > 0 ? `Send OTP (${cooldown}s)` : 'Send OTP'}
            </button>

            <button
              type="button"
              onClick={verifyOtp}
              disabled={isVerified || isLoading.verifyOtp}
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              {isLoading.verifyOtp ? (
                <>
                  <LoadingSpinner />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        </div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
          disabled={isLoading.register}
        />

        {isVerified ? (
          <button
            type="submit"
            disabled={isLoading.register}
            className={`w-full flex justify-center items-center bg-black text-white py-3 rounded-md hover:bg-gray-900 transition duration-200 ${
              isLoading.register ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading.register ? (
              <>
                <LoadingSpinner />
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full text-center text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
