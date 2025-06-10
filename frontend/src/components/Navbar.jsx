import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, cleanupAuth, setCartItems } = useContext(ShopContext);

  const logout = () => {
    cleanupAuth();
    navigate('/login');
    setCartItems({});
  };

  const navLinkStyle = 'flex flex-col items-center gap-1 relative group';
  const navLinkText = 'text-gray-700 group-hover:text-black transition-colors duration-200';
  const navLinkUnderline = 'absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-black transition-all duration-300';

  return (
    <div className='sticky top-0 z-50 bg-white px-4 sm:px-10 py-4 flex items-center justify-between shadow-sm font-medium'>
      
      {/* Left Navigation Links */}
      <ul className='hidden sm:flex gap-8 text-sm'>
        <NavLink to='/' className={navLinkStyle}>
          <p className={navLinkText}>HOME</p>
          <div className={navLinkUnderline}></div>
        </NavLink>
        <NavLink to='/collection' className={navLinkStyle}>
          <p className={navLinkText}>COLLECTION</p>
          <div className={navLinkUnderline}></div>
        </NavLink>
        <NavLink to='/about' className={navLinkStyle}>
          <p className={navLinkText}>ABOUT</p>
          <div className={navLinkUnderline}></div>
        </NavLink>
        <NavLink to='/contact' className={navLinkStyle}>
          <p className={navLinkText}>CONTACT</p>
          <div className={navLinkUnderline}></div>
        </NavLink>
      </ul>

      {/* Logo */}
      <Link to='/' className='font-bold text-md flex items-center'>
        <img src={assets.all3} className='h-12 w-auto' alt='Logo' />
      </Link>

      {/* Right Icons */}
      <div className='flex items-center gap-5'>
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='Search'
        />

        <div className='relative group'>
          <img
            onClick={() => (token ? null : navigate('/login'))}
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt='Profile'
          />
          {token && (
            <div className='absolute hidden group-hover:flex flex-col right-0 mt-2 py-3 px-4 bg-white border rounded shadow-md text-sm text-gray-600 w-36 z-50'>
              <p className='cursor-pointer hover:text-black' onClick={() => navigate('/profile')}>My Profile</p>
              <p className='cursor-pointer hover:text-black' onClick={() => navigate('/orders')}>Orders</p>
              <p className='cursor-pointer hover:text-black' onClick={logout}>Logout</p>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center bg-black text-white text-[10px] leading-4 rounded-full'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='Menu'
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full text-gray-700'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-4 border-b cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back' />
            <p className='text-sm'>Back</p>
          </div>
          <div className='flex flex-col'>
            <NavLink onClick={() => setVisible(false)} to='/' className='py-3 px-6 border-b hover:bg-gray-100'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/collection' className='py-3 px-6 border-b hover:bg-gray-100'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/about' className='py-3 px-6 border-b hover:bg-gray-100'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/contact' className='py-3 px-6 border-b hover:bg-gray-100'>CONTACT</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
