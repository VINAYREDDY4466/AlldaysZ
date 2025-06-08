import React from 'react'

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p className="mb-4">
          Please read these terms and conditions carefully before using our website and services.
        </p>

        <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3 className="text-xl font-semibold mb-3">2. Use License</h3>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
        </p>

        <h3 className="text-xl font-semibold mb-3">3. User Account</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>You must be at least 18 years old to create an account</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You agree to provide accurate and complete information</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">4. Product Information</h3>
        <p className="mb-4">
          We strive to display accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
        </p>

        <h3 className="text-xl font-semibold mb-3">5. Pricing and Payment</h3>
        <p className="mb-4">
          All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice at any time.
        </p>
      </div>
    </div>
  )
}

export default TermsOfService 