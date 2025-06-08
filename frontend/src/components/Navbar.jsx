import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, cleanupAuth, setCartItems} = useContext(ShopContext);

    const logout = () => {
        cleanupAuth();
        navigate('/login');
        setCartItems({});
    }

  return (
    <div className='sticky top-0 z-50 bg-white flex items-center justify-between py-5 font-medium'>
      
      <Link to='/' className='flex w-36 h-10 items-center justify-center font-bold text-md '>
        <img src={assets.FinalLogo} className='h-12  w-50' alt="" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
            <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link> 
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> 
      </div>

        {/* Sidebar menu for small screens */}
        <div className={`fixed top-0 right-0 h-screen w-[250px] bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col text-gray-600 h-full'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <div className='flex flex-col'>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-50' to='/'>HOME</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-50' to='/collection'>COLLECTION</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-50' to='/about'>ABOUT</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-50' to='/contact'>CONTACT</NavLink>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Navbar
