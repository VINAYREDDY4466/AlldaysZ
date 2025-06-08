import React, { useState } from "react";

const faqData = [
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3–7 business days depending on your location. You'll receive a tracking link via email once your order is shipped.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI, credit/debit cards, net banking, and wallet payments. Cash on Delivery (COD) is available for select pin codes.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, we offer a 7-day return or exchange policy from the date of delivery. The item should be unused and in original packaging.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, a tracking link will be sent to your registered email and phone number. You can also track it in your account section.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely! We use industry-standard SSL encryption to ensure all transactions are secure and your personal data is safe.We are used razorpay fpr payment gatway",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left px-4 py-3 flex justify-between items-center font-medium focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              <span>{item.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
