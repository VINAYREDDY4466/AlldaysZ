import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-gray-50 w-full">
      {/* About Us Title */}
      <section className="text-center pt-10 px-4 sm:px-6">
        <Title text1={"ABOUT"} text2={"US"} />
      </section>

      {/* About Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          className="w-full max-w-[500px] mx-auto rounded-xl shadow-lg"
          src={assets.about_img}
          alt="About Trenzza"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-700 text-sm sm:text-base">
          <p className="leading-relaxed text-justify">
            At Trenzza, we believe fashion is more than just clothing — it's a way of expressing your identity, confidence, and creativity. Founded with the vision of making premium style accessible, Trenzza is a modern online destination for trend-savvy individuals who value quality, individuality, and authenticity.
            <br /><br />
            From curated collections of the latest trends to timeless essentials, every piece at Trenzza is chosen with a purpose — to make you feel comfortable, stylish, and confident in your everyday life. Whether you're dressing up for an occasion or just updating your daily wardrobe, Trenzza offers a seamless and enjoyable shopping experience backed by fast delivery, secure payments, and top-tier customer support.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="leading-relaxed text-justify">
              To inspire confidence through fashion and provide customers with thoughtfully selected collections that celebrate self-expression and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Title */}
      <section className="bg-white py-10 px-4 sm:px-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </section>

      {/* Why Choose Us Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-20">
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">Quality Assurance</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">Convenience</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">Exceptional Customer Service</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
