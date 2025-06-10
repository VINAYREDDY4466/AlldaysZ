import React, { useState } from "react";
import { Plus, Minus, HelpCircle, Shield, Truck, CreditCard, RotateCcw, Search } from "lucide-react";

const faqData = [
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3–7 business days depending on your location. You'll receive a tracking link via email once your order is shipped.",
    icon: Truck,
    category: "shipping"
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI, credit/debit cards, net banking, and wallet payments. Cash on Delivery (COD) is available for select pin codes.",
    icon: CreditCard,
    category: "payment"
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, we offer a 7-day return or exchange policy from the date of delivery. The item should be unused and in original packaging.",
    icon: RotateCcw,
    category: "returns"
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, a tracking link will be sent to your registered email and phone number. You can also track it in your account section.",
    icon: Search,
    category: "shipping"
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely! We use industry-standard SSL encryption to ensure all transactions are secure and your personal data is safe. We use Razorpay for payment gateway.",
    icon: Shield,
    category: "security"
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryColor = (category) => {
    const colors = {
      shipping: "from-blue-500 to-cyan-500",
      payment: "from-green-500 to-emerald-500",
      returns: "from-orange-500 to-yellow-500",
      security: "from-purple-500 to-pink-500"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-medium text-sm">Support Center</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, shipping, and policies
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const IconComponent = item.icon;
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  isOpen ? 'ring-2 ring-indigo-200' : ''
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center gap-4 focus:outline-none"
                  onClick={() => toggleAnswer(index)}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(item.category)} flex items-center justify-center transform transition-transform duration-300 ${
                    isOpen ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Question */}
                  <span className="flex-1 font-semibold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">
                    {item.question}
                  </span>
                  
                  {/* Toggle Icon */}
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-indigo-100 rotate-180' : 'group-hover:bg-gray-200'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="px-6 pb-6 ml-16">
                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-4 border-l-4 border-indigo-200">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our support team is here to help you 24/7</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <HelpCircle className="w-5 h-5" />
              Contact Support
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Faq;