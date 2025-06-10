import React from 'react';
import { Calendar, Award, Headphones, Sparkles, ArrowRight } from 'lucide-react';

const policyItems = [
  {
    icon: Calendar,
    title: 'Easy Bookings',
    description: 'Enjoy a smooth and intuitive shopping experience with our streamlined checkout process.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest products, handpicked with care and rigorously tested for excellence.',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help, anytime you need us. Our dedicated team ensures your satisfaction.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
];

const OurPolicy = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 px-6 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">Our Promise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Shop 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> With Us?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the difference with our commitment to quality, service, and your satisfaction
          </p>
        </div>

        {/* Policy Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {policyItems.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <div 
                key={index} 
                className="group relative"
              >
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${item.bgGradient} p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm`}>
                  {/* Floating Icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Connection Lines (for larger screens) */}
                {index < policyItems.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-px bg-gradient-to-r from-gray-300 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to experience the difference?</h3>
          <p className="text-gray-600 mb-6">Join thousands of satisfied customers who trust us for their needs</p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;