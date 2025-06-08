import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const UpdatePassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { api } = useContext(ShopContext)
  const [newPassword, setNewPassword] = useState('')
  const email = location.state?.email || ''

  const updatePassword = async (e) => {
    e.preventDefault()
    if (!newPassword || !email) {
      return toast.error('Missing information')
    }

    try {
      const res = await api.post('/api/user/forgot-password', { email, newpassword: newPassword })
      toast.success('Password updated successfully')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed')
    }
  }

  return (
    <form onSubmit={updatePassword} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Update Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      <input value={email} readOnly className='w-full px-3 py-2 border border-gray-800 bg-gray-100' placeholder='Email' />
      <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='New Password' required />
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>Update Password</button>
    </form>
  )
}

export default UpdatePassword
