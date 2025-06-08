import React from 'react'

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Our Shipping Information</h2>
        <p className="mb-4">
          We strive to provide fast and reliable shipping services to all our customers.
        </p>

        <h3 className="text-xl font-semibold mb-3">Shipping Methods</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Standard Shipping (3-5 business days)</li>
          <li>International Shipping (7-14 business days)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Shipping Costs</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Free shipping on orders over 2000 INR</li>

          <li>Express shipping: 79 INR for domestic orders</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Order Processing</h3>
        <p className="mb-4">
          Orders are typically processed within 1-2 business days. You will receive a shipping confirmation email with tracking information once your order ships.
        </p>

        <h3 className="text-xl font-semibold mb-3">Delivery Times</h3>
        <p className="mb-4">
          Delivery times may vary depending on your location and the shipping method selected. International orders may be subject to customs delays.
        </p>
      </div>
    </div>
  )
}

export default ShippingPolicy 