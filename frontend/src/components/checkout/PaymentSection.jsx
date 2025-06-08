import React from 'react';
import Title from '../Title';
import { assets } from '../../assets/assets';

const PaymentSection = ({ 
  method, 
  setMethod, 
  isLoading, 
  getCartAmount, 
  delivery_fee, 
  isFreeDelivery, 
  isCouponApplied, 
  calculateTotal 
}) => {
  return (
    <div className="w-full lg:max-w-[400px] mt-10 lg:mt-0 flex flex-col gap-8">
      {/* Payment Method Section */}
      <div className="mt-8">
        <Title text1="Payment" text2="Method" />
        <div className="flex flex-col gap-3 mt-4">
          {[
            { key: 'razorpay', label: 'Razorpay', icon: assets.razorpay_logo },
          ].map(({ key, label, icon }) => (
            <div
              key={key}
              onClick={() => !isLoading && setMethod(key)}
              className={`flex items-center gap-3 border p-3 rounded cursor-pointer ${
                method === key ? 'border-green-500 bg-green-50' : 'hover:bg-gray-100'
              } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <span
                className={`h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center ${
                  method === key ? 'bg-green-400' : ''
                }`}
              />
              <img src={icon} alt={label} className="h-5" />
              <span className="ml-2">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{getCartAmount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className={isFreeDelivery ? 'text-green-600' : ''}>
              {isFreeDelivery ? 'Free' : `₹${delivery_fee}`}
            </span>
          </div>
          {isCouponApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>-₹{(getCartAmount() + (isFreeDelivery ? 0 : delivery_fee)) * 0.1}</span>
            </div>
          )}
          <div className="flex justify-between font-medium border-t pt-2 mt-2">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection; 