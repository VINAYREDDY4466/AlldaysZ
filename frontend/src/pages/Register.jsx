import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isLoading, setIsLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    register: false
  })
  const navigate = useNavigate()
  const { api } = useContext(ShopContext)

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  const registersendOtp = async () => {
    if (!email) return toast.error('Please enter your email')
    if (cooldown > 0) return toast.error(`Please wait ${cooldown} seconds before requesting a new OTP`)
    
    setIsLoading(prev => ({ ...prev, sendOtp: true }))
    try {
      const res = await api.post('/api/user/registerotp', { email })
      if (res.data.success) {
        toast.info(res.data.message)
        setCooldown(30) // Set 30 seconds cooldown
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP')
    } finally {
      setIsLoading(prev => ({ ...prev, sendOtp: false }))
    }
  }

  const verifyOtp = async () => {
    if (!otp) return toast.error('Please enter the OTP')
    setIsLoading(prev => ({ ...prev, verifyOtp: true }))
    try {
      const res = await api.post('/api/user/verifyotp', { email, otp, type: 'register' })
      if (res.data.success) {
        setIsVerified(true)
        toast.success('Email verified')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed')
    } finally {
      setIsLoading(prev => ({ ...prev, verifyOtp: false }))
    }
  }

  const register = async (e) => {
    e.preventDefault()
    if (!isVerified) return toast.error('Please verify your email first')
    setIsLoading(prev => ({ ...prev, register: true }))
    try {
      const res = await api.post('/api/user/register', { name, email, password })
      toast.success('Registered successfully')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(prev => ({ ...prev, register: false }))
    }
  }

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )

  return (
    <form onSubmit={register} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Register</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Name' 
        required 
        disabled={isLoading.register}
      />
      
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        type="email"
        required 
        disabled={isLoading.register || isLoading.sendOtp || isLoading.verifyOtp}
      />

      <div className="w-full relative">
        <input 
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800 mb-1'
          placeholder='Enter OTP'
          type="text"
          maxLength={6}
          disabled={isVerified || isLoading.verifyOtp || isLoading.register}
        />
        <div className="flex gap-2 absolute right-2 bottom-2">
          <button 
            type="button"
            onClick={registersendOtp}
            className={`text-sm hover:underline flex items-center ${
              cooldown > 0 || isLoading.sendOtp
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-500'
            }`}
            disabled={cooldown > 0 || isVerified || isLoading.sendOtp}
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
            className='text-blue-500 text-sm hover:underline flex items-center'
            disabled={isVerified || isLoading.verifyOtp}
          >
            {isLoading.verifyOtp ? (
              <>
                <LoadingSpinner />
                Verifying...
              </>
            ) : 'Verify OTP'}
          </button>
        </div>
      </div>

      <input 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        type='password' 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required 
        disabled={isLoading.register}
      />

      {isVerified ? (
        <button 
          type='submit' 
          className={`w-full bg-black text-white font-light px-8 py-2 mt-4 flex items-center justify-center ${isLoading.register ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading.register}
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
          className='text-blue-600 mt-4'
        >
          Back to Login
        </button>
      )}
    </form>
  )
}

export default Register

