import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [otpVerified, setOtpVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isResendingOtp, setIsResendingOtp] = useState(false)
  const { api } = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  const passwordsendOtp = async () => {
    if (!email) return toast.error('Please enter your email')
    if (cooldown > 0) return toast.error(`Please wait ${cooldown} seconds before requesting a new OTP`)
    
    setIsSendingOtp(true)
    try {
      const res = await api.post('/api/user/passwordotp', { email })
      if (res.data.success) {
        toast.info(res.data.message)
        setStep(2)
        setCooldown(30) // Set 30 seconds cooldown
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP')
    } finally {
      setIsSendingOtp(false)
    }
  }

  const resendOtp = async () => {
    if (cooldown > 0) return toast.error(`Please wait ${cooldown} seconds before requesting a new OTP`)
    
    setIsResendingOtp(true)
    try {
      const res = await api.post('/api/user/resendotp', { email, type: 'password' })
      if (res.data.success) {
        toast.info(res.data.message)
        setCooldown(30) // Set 30 seconds cooldown
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resending OTP')
    } finally {
      setIsResendingOtp(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp) return toast.error('Please enter the OTP')
    try {
      const res = await api.post('/api/user/verifyotp', { email, otp, type: 'password' })
      if (res.data.success) {
        toast.success('OTP Verified')
        setOtpVerified(true)
        setStep(3)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed')
    }
  }

  const updatePassword = async () => {
    if (!newPassword) return toast.error('Please enter new password')
    if (newPassword.length < 8) return toast.error('Password must be at least 8 characters long')
    try {
      await api.post('/api/user/forgot-password', { email, newpassword: newPassword })
      toast.success('Password updated successfully')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed')
    }
  }

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Forgot Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Step 1: Enter email */}
      {step === 1 && (
        <>
          <p className='text-gray-600 text-center mb-4'>
            Enter your email address to receive a verification code
          </p>
          <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Enter your email'
            type="email"
            required
          />
          <button
            type="button"
            onClick={passwordsendOtp}
            className={`w-full text-white font-light px-8 py-2 mt-4 cursor-pointer flex items-center justify-center gap-2 ${
              cooldown > 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'
            }`}
            disabled={cooldown > 0 || isSendingOtp}
          >
            {isSendingOtp ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending OTP...
              </>
            ) : cooldown > 0 ? (
              `Send OTP (${cooldown}s)`
            ) : (
              'Send OTP'
            )}
          </button>
        </>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <>
          <p className='text-gray-600 text-center mb-4'>
            Enter the verification code sent to your email
          </p>
          <input 
            value={email}
            className='w-full px-3 py-2 border border-gray-800 bg-gray-100'
            placeholder='Email'
            type="email"
            disabled
          />
          <div className="w-full relative">
            <input 
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className='w-full px-3 py-2 border border-gray-800 mb-1'
              placeholder='Enter OTP'
              type="text"
              maxLength={6}
              disabled={otpVerified}
            />
            <div className="flex gap-2 absolute right-2 bottom-2">
              <button 
                type="button"
                onClick={resendOtp}
                className={`text-sm hover:underline flex items-center gap-1 ${
                  cooldown > 0 || isResendingOtp
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-500'
                }`}
                disabled={cooldown > 0 || otpVerified || isResendingOtp}
              >
                {isResendingOtp ? (
                  <>
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  `Resend OTP (${cooldown}s)`
                ) : (
                  'Resend OTP'
                )}
              </button>
              <button 
                type="button"
                onClick={verifyOtp}
                className='text-blue-500 text-sm hover:underline'
                disabled={otpVerified}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Update Password */}
      {step === 3 && otpVerified && (
        <>
          <p className='text-gray-600 text-center mb-4'>Enter your new password</p>
          <input 
            value={email}
            className='w-full px-3 py-2 border border-gray-800 bg-gray-100'
            placeholder='Email'
            type="email"
            disabled
          />
          <input 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Enter new password'
            type="password"
            required
          />
          <button
            type="button"
            onClick={updatePassword}
            className='w-full bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'
          >
            Update Password
          </button>
        </>
      )}

      <button 
        type="button"
        onClick={() => navigate('/login')}
        className='text-blue-600 mt-4'
      >
        Back to Login
      </button>
    </div>
  )
}

export default ForgotPassword
