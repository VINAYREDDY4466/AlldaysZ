import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Aravind Reddy",
      role: "Hyderabad",
      text: "The product quality is top-notch and feels very premium. It was exactly what I needed, and I'm really happy with the purchase.",
      rating: 5,
    },
    {
      id: 2,
      name: "Babu Naik",
      role: "Warangal",
      text: "Genuine Quality with affordable price. The product looks great and works perfectly—very genuine and reliable!",
      rating: 4,
    },
    {
      id: 3,
      name: "Shashi Kumar",
      role: "Kakinda",
      text: "Absolutely loved the experience! The website was easy to navigate, the order process was smooth, and the delivery was faster than expected",
      rating: 5,
    },
    {
      id: 4,
      name: "Vinay Reddy",
      role: "Mumbai",
      text: "Received my order in perfect condition. You can tell the materials used are of high quality. This level of attention to detail really impressed me",
      rating: 4,
    },
    {
      id: 5,
      name: "Naveen",
      role: "Andhra Pradesh",
      text: "I appreciate the effort put into packaging and presentation. The product itself exceeded my expectations in terms of both appearance and performance",
      rating: 4,
    },
  ];

  const maxSlides = testimonials.length - 1;

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveSlide(prev => prev >= maxSlides ? 0 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, maxSlides]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const getInitials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full mb-4">
            <span className="text-purple-300 font-medium text-sm tracking-wider uppercase">Reviews</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What Customers 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mx-auto max-w-4xl">
                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-300/50" />
                    
                    {/* Content */}
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {getInitials(testimonial.name)}
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-white mb-1">{testimonial.name}</h3>
                          <p className="text-purple-300 font-medium">{testimonial.role}</p>
                        </div>
                        
                        <p className="text-gray-200 text-lg leading-relaxed mb-6">
                          "{testimonial.text}"
                        </p>
                        
                        {/* Rating */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${
                                i < testimonial.rating 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === index 
                    ? 'w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;