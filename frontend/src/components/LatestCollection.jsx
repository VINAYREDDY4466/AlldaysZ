import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setLatestProducts(products.slice(0, 10));
    setIsLoading(false);
  }, [products]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black text-white text-xs font-medium rounded-full mb-6 tracking-wider uppercase">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            New Arrivals
          </div>
          
          <div className="mb-6">
            <Title text1="LATEST" text2="COLLECTIONS" />
          </div>
          
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Discover the latest collections that value quality over quantity and celebrate individuality. 
            <span className="block mt-2 text-sm text-gray-500">Handpicked designs that define modern elegance</span>
          </p>
        </div>

        {/* Product Grid - Changed from grid-cols-1 to grid-cols-2 for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {isLoading ? (
            // Enhanced Loading skeleton
            Array(12).fill().map((_, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-3 sm:p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : latestProducts.length === 0 ? (
            // Enhanced No products message
            <div className="col-span-full">
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Collection</h3>
                <p className="text-gray-500 mb-6">Please wait while we curate the latest products for you</p>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            latestProducts.slice(0, 12).map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          )}
        </div>

        {/* Enhanced CTA Section */}
        {!isLoading && latestProducts.length > 0 && (
           <div className="flex justify-center mt-10">
                 <Link to="/collection">
                   <button className="bg-black text-white text-sm px-6 py-2.5 rounded-md hover:bg-gray-700 transition-all duration-300">
                     View More
                   </button>
                 </Link>
               </div>
        )}
      </div>
    </section>
  );
};

export default LatestCollection;