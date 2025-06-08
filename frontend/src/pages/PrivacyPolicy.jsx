import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
        <p className="mb-4">
          We are committed to protecting your privacy and ensuring the security of your personal information.
        </p>

        <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal information (name, email, address)</li>
          <li>Payment information</li>
          <li>Order history</li>
          <li>Browsing behavior</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Process your orders</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Data Security</h3>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy 