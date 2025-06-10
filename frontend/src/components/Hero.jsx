import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/path-to-poster-image.jpg" // Add a poster image for better loading
        >
          <source src="../../public/WhatsApp Video 2025-06-10 at 14.21.07_50cb8958.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20 sm:py-24 lg:py-0">
            
            {/* Hero Text Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              {/* Trending Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs sm:text-sm font-medium text-white tracking-wider uppercase">
                  ✨ Trending Now
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block">Discover the</span>
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  New Collection
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Elevate your wardrobe with our newest arrivals — a blend of authenticity, 
                craftsmanship, and timeless fashion that speaks to your unique style.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
                <Link to="/collection">
                  <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                    Shop Now
                  </button>
                </Link>
                
                <Link to="/about">
                  <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base backdrop-blur-sm">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Social Proof or Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-8 text-white/80">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wide">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wide">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">4.9★</div>
                  <div className="text-xs sm:text-sm uppercase tracking-wide">Rating</div>
                </div>
              </div>
            </div>

            {/* Optional: Feature highlights or additional content */}
            <div className="hidden lg:block">
              {/* This space can be used for additional content, product showcase, or kept empty for video focus */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-white/50 animate-pulse"></div>
        </div>
      </div>

      {/* Mobile-specific video optimization */}
      <style jsx>{`
        @media (max-width: 768px) {
          video {
            object-position: center;
          }
        }
        
        /* Ensure smooth scrolling */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;