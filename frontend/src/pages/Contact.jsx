import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="bg-white w-full">
      {/* Page Title */}
      <section className="text-center pt-10 px-4 sm:px-6 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          className="w-full max-w-[500px] mx-auto rounded-xl shadow-lg"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col gap-6 text-gray-700 text-sm sm:text-base">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Our Trenzza Store
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Beside RTO Office, Above Ather Store, Kondapur, Hyderabad -500084
            </p>
            <a
              href="https://maps.app.goo.gl/b1oYzjxDFkFWSnL69"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Google Map Location
            </a>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Contact
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mobile Number: +91 6304371253 <br />
              Email: trenzza@gmail.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Customer Support
            </h3>
            <h4>For Quick Response</h4>
            <a
              href="https://wa.me/+916304371253"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-2 bg-green-700 px-4 py-2 rounded-lg text-white hover:bg-green-800 transition">
                <img
                  src={assets.Image}
                  alt="WhatsApp Icon"
                  className="w-5 h-5"
                />
                Whatsapp
              </button>
            </a>

            <p className="text-gray-600 leading-relaxed mb-4">
              We are committed to providing exceptional customer support,
              available every day from 10 AM to 10 PM. Our dedicated team is
              ready to assist you with any questions or issues you may
              encounter, ensuring a seamless and hassle-free experience. Whether
              it's troubleshooting, inquiries, or assistance with our products
              or services, you can count on us to provide timely and effective
              solutions without any unnecessary complications
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
