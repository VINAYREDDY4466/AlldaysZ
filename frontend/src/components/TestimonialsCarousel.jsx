import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import AnimationScroller from "../utils/AnimationScroller"

const TestimonialsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

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
      text: "Geninue Quality with affordable price. The product looks great and works perfectly—very genuine and reliable!",
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
      id: 6,
      name: "Naveen",
      role: "AndhraPradesh",
      text: "I appreciate the effort put into packaging and presentation. The product itself exceeded my expectations in terms of both appearance and performance",
      rating: 4,
    },
  ];

  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const getCurrentCardsPerView = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    if (width < 768) return cardsPerView.mobile;
    if (width < 1280) return cardsPerView.tablet;
    return cardsPerView.desktop;
  };

  const getMaxSlideIndex = () => {
    const currentCardsPerView = getCurrentCardsPerView();
    return Math.max(0, testimonials.length - currentCardsPerView);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => {
          const maxIndex = getMaxSlideIndex();
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    const handleResize = () => {
      const maxIndex = getMaxSlideIndex();
      if (activeSlide > maxIndex) {
        setActiveSlide(maxIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSlide]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const getTranslationPercentage = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    if (width < 768) return activeSlide * 100;
    if (width < 1280) return activeSlide * 50;
    return activeSlide * 33.333;
  };

  const getCardWidthClass = () => {
    return "w-full md:w-1/2 xl:w-1/3";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 shadow-lg text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-500 font-medium uppercase tracking-wider mb-2">
            Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold  text-black mb-4">
            What Customers <span className="text-black-500">Say's</span>
          </h2>
          <AnimationScroller />
        </div>

        <div className="relative overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${getTranslationPercentage()}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${getCardWidthClass()} flex-shrink-0 px-4`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="bg-white text-gray-800 rounded-lg p-6 relative shadow-lg min-h-80 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-950 text-white text-xl font-bold mr-4">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-indigo-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div className="flex mt-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <FaRegStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(getMaxSlideIndex() + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index ? "w-8 bg-indigo-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
