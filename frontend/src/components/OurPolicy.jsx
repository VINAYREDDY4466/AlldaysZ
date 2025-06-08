import React from 'react';
import { assets } from '../assets/assets';

const policyItems = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Bookings',
    description: 'Enjoy a smooth and intuitive shopping experience.',
  },
  {
    icon: assets.quality_icon,
    title: 'Premium Quality',
    description: 'Only the finest products, handpicked with care.',
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    description: 'Always here to help, anytime you need us.',
  },
];

const OurPolicy = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {policyItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <img src={item.icon} alt={item.title} className="w-14 h-14 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
