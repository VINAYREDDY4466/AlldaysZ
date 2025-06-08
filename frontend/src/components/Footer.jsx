import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t pt-10 px-6 md:px-12 lg:px-24">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo and Description */}
        <div className="col-span-2">
          <img
            src={assets.FinalLogo}
            alt="Treenza Logo"
            className="w-36 mb-4"
          />
          <p className="text-sm text-gray-600 leading-relaxed">
            At Treenza, we take pride in offering a handpicked collection of
            unique, genuine, and high-quality products. Every item in our store
            is carefully selected to ensure it reflects our commitment to
            craftsmanship, authenticity, and style.
          </p>
        </div>

        {/* Clothing Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Clothing</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-black">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +91-6304371253</li>
            <li>📧 trenzza.kondapur@gmail.com</li>
            <li>
              <Link to="/terms-of-service" className="hover:text-black">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-black">
                Shipping Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-row mt-10 border-t pt-4 text-center text-xs  justify-center gap-4 flex-wrap">
        <span>© 2024 Treenza.com - All Rights Reserved.</span>
        <span  className='text-black font-bold font-serif'>Crafted by Vinay Reddy Dodlapati</span>
        <a
          href="mailto:vinayreddyd4466@gmail.com"
          target="_blank"
          className="underline hover:text-gray-700"
        >
          Reach out to me
        </a>
      </div>
    </footer>
  );
};

export default Footer;
