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
    <section className="my-16 px-6 md:px-12 lg:px-20">
      {/* Title Section */}
      <div className="text-center mb-10 text-3xl py-6 ">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 mt-3 ">
          Discover the latest collections that value quality over quantity and celebrate individuality.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array(14).fill().map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : latestProducts.length === 0 ? (
          // No products message
          <div className="col-span-full text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
          Please wait while we load your products... or refresh the page if it takes too long.
          </div>
          {/* Spinner */}
          <div className="flex justify-center">
            <div className="w-5 h-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        ) : (
          latestProducts.slice(0, 14).map((item, index) => (
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

      {/* More Button */}
      <div className="flex justify-center mt-10">
        <Link to="/collection">
          <button className="bg-black text-white text-sm px-6 py-2.5 rounded-md hover:bg-gray-700 transition-all duration-300">
            View More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
