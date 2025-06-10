import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate original price (assuming 35% discount)
  const originalPrice = Math.round(price / 0.65);
  const discount = Math.round((originalPrice - price) / originalPrice * 100);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        onClick={() => scrollTo(0, 0)} 
        className="block" 
        to={`/product/${id}`}
      >
        {/* Product Card */}
        <div className="relative bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] group-hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
              </div>
            )}
            
            {/* Product Image */}
            <img 
              className={`w-full h-full object-cover transition-all duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-110`}
              src={image[0]} 
              alt={name}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  -{discount}% OFF
                </div>
              </div>
            )}

            {/* Quick View Button (appears on hover) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-105">
                Quick View
              </button>
            </div>

            {/* New/Trending Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                NEW
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-3">
            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-2 group-hover:text-black transition-colors duration-300">
              {name}
            </h3>

            {/* Rating (Mock) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.2)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {currency}{price}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {currency}{originalPrice}
                  </span>
                )}
              </div>
              
              {/* Add to Cart Icon */}
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>

            {/* Size Options (Mock) */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-gray-600">Sizes:</span>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div 
                  key={size} 
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs hover:border-black transition-colors duration-200 cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${
            isHovered ? 'shadow-2xl ring-1 ring-black/5' : ''
          }`}></div>
        </div>
      </Link>
    </div>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default ProductItem;