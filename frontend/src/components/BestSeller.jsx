import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setBestSeller(products.slice(0, 10));
    setIsLoading(false);
  }, [products]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full opacity-15 blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          {/* Bestseller Badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            BESTSELLERS
          </div>

          {/* Title */}
          <div className="mb-6">
            <Title className="text-black" text1="BEST" text2="SELLERS" />
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              Explore our best sellers — a curated selection that reflects quality, authenticity, and timeless style.
            </p>
            <p className="text-sm text-gray-500">
              Loved by thousands of customers worldwide ✨
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                4.8★
              </div>
              <div className="text-sm text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                99%
              </div>
              <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {isLoading ? (
            // Enhanced Loading Skeleton
            Array(10).fill().map((_, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                  <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="h-4 sm:h-5 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-8 sm:w-12"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : bestSeller.length === 0 ? (
            // Enhanced No Products Message
            <div className="col-span-full">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center max-w-lg mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Bestsellers</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  We're curating the most popular items just for you
                </p>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-10 h-10 border-4 border-transparent border-r-orange-400 rounded-full animate-spin animate-reverse"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            bestSeller.slice(0, 10).map((item, index) => (
              <div key={item._id || index} className="relative">
                {/* Bestseller Badge for Top 3 */}
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 z-20 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    #{index + 1}
                  </div>
                )}
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))
          )}
        </div>

        {/* Enhanced CTA Section */}
        {!isLoading && bestSeller.length > 0 && (
          <div className="mt-24">
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>

              <div className="relative z-10 px-8 md:px-16 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-8 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Explore More?
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Discover our complete collection of premium products, carefully curated to match your style and exceed your expectations.
                  </p>

                  {/* Enhanced CTA Button */}
                  <Link to="/collection">
                    <button className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-black bg-white rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                      <span className="relative z-10 flex items-center">
                        <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
                        </svg>
                        View Complete Collection
                        <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                    </button>
                  </Link>

                  {/* Additional Info */}
                  <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Free Shipping
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.259.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Quality Guaranteed
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                      </svg>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
};

export default BestSeller;