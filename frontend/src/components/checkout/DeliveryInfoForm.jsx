import React from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';

const DeliveryInfoForm = ({ formData, onChangeHandler, termsAccepted, privacyAccepted, setTermsAccepted, setPrivacyAccepted, isLoading }) => {
  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-[500px]">
      <Title text1="Delivery" text2="Information" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          onChange={onChangeHandler}
          name="firstName"
          value={formData.firstName}
          disabled={isLoading}
          placeholder="First name"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          required
          onChange={onChangeHandler}
          name="lastName"
          value={formData.lastName}
          disabled={isLoading}
          placeholder="Last name"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <input
        required
        onChange={onChangeHandler}
        name="email"
        value={formData.email}
        disabled={isLoading}
        placeholder="Email address"
        className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        required
        onChange={onChangeHandler}
        name="street"
        value={formData.street}
        disabled={isLoading}
        placeholder="Street"
        className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          required
          onChange={onChangeHandler}
          name="city"
          value={formData.city}
          disabled={isLoading}
          placeholder="City"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          onChange={onChangeHandler}
          name="state"
          value={formData.state}
          disabled={isLoading}
          placeholder="State"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          required
          onChange={onChangeHandler}
          name="zipcode"
          value={formData.zipcode}
          disabled={isLoading}
          placeholder="Zipcode"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          required
          onChange={onChangeHandler}
          name="country"
          value={formData.country}
          disabled={isLoading}
          placeholder="Country"
          className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <input
        required
        onChange={onChangeHandler}
        name="phone"
        value={formData.phone}
        disabled={isLoading}
        placeholder="Phone"
        className="border border-gray-300 rounded-md px-4 py-3 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Terms Checkboxes */}
      <div className="space-y-2 mt-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            disabled={isLoading}
          />
          <span>
            I agree to the{' '}
            <Link to="/terms-of-service" className="text-blue-600 underline">
              Terms of Service
            </Link>
          </span>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            disabled={isLoading}
          />
          <span>
            I agree to the{' '}
            <Link to="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>
    </div>
  );
};

export default DeliveryInfoForm; 