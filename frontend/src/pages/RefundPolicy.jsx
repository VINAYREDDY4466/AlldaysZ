import React from 'react'

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Our Refund Policy</h2>
        <p className="mb-4">
          We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Eligibility for Refunds</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Items must be returned within 30 days of delivery</li>
          <li>Items must be in original condition with all tags attached</li>
          <li>Items must be in original packaging</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">How to Request a Refund</h3>
        <ol className="list-decimal pl-6 mb-4">
          <li>Contact our customer service team</li>
          <li>Provide your order number and reason for return</li>
          <li>Follow the return shipping instructions</li>
        </ol>

        <h3 className="text-xl font-semibold mb-3">Refund Process</h3>
        <p className="mb-4">
          Once we receive your returned item, we will inspect it and process your refund within 5-7 business days. The refund will be issued to your original payment method.
        </p>
      </div>
    </div>
  )
}

export default RefundPolicy 