import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }

      setCartData(tempData);
      setIsLoading(false);
    }
  }, [cartItems, products]);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600 text-lg">Loading cart...</div>;
  }

  if (cartData.length === 0) {
    return (
      <div className="text-center py-20">
        <Title text1="Your" text2="Cart is Empty" />
        <p className="text-gray-500 mt-4">Looks like you haven't added anything yet.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-md p-4 shadow-sm"
            >
              {/* Left: Image */}
              <img
                src={productData.image[0]}
                alt={productData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded"
              />

              {/* Right: Details */}
              <div className="flex flex-col flex-1 sm:ml-6 mt-4 sm:mt-0 w-full">
                <p className="text-base font-semibold">{productData.name}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">
                    Size: <span className="font-medium">{item.size}</span>
                  </span>
                  <span className="text-sm text-gray-600">
                    Price: <span className="font-medium">{currency}{productData.price}</span>
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                      className="bg-gray-200 w-7 h-7 rounded text-lg flex items-center justify-center"
                    >
                      –
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="bg-gray-200 w-7 h-7 rounded text-lg flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    alt="Remove"
                    className="w-5 h-5 cursor-pointer"
                    title="Remove from cart"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Summary */}
      <div className="flex justify-end mt-14">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-right">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black hover:bg-gray-800 text-white text-sm mt-8 px-8 py-3 rounded"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
