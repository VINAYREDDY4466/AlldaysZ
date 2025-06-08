import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="w-full bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-12 py-16 lg:py-24">
        
        {/* Hero Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-sm font-medium text-gray-700 mb-2 tracking-wide">TRENDING NOW</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Discover the New Collection
          </h1>
          <p className="text-gray-600 mb-8 text-base md:text-lg">
            Elevate your wardrobe with our newest arrivals — a blend of authenticity, craftsmanship, and timeless fashion.
          </p>
          <Link to="/collection">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 text-sm md:text-base">
              Shop Now
            </button>
          </Link>

          
        </div>

        {/* Hero Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.Heroo}
            alt="Hero"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
