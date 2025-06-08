import PropTypes from 'prop-types';
import Title from '../Title';
import { assets } from '../../assets/assets';

const CouponSection = ({
  couponCode,
  setCouponCode,
  isCouponApplied,
  isFreeDelivery,
  applyCoupon,
  removeCoupon,
  showOffers,
  setShowOffers
}) => {
  return (
    <div className="mt-4">
      <Title text1="Apply" text2="Coupon" />
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
          disabled={isCouponApplied || isFreeDelivery}
        />
        {!isCouponApplied && !isFreeDelivery ? (
          <button
            type="button"
            onClick={applyCoupon}
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
          >
            Apply
          </button>
        ) : (
          <button
            type="button"
            onClick={removeCoupon}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>

      {/* Offers Section */}
      <div className="mt-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowOffers(!showOffers)}
        >
          <Title text1="Available" text2="Offers" />
          <img 
            src={assets.dropdown_icon} 
            className={`w-4 transition-transform ${showOffers ? 'rotate-180' : ''}`} 
            alt="toggle offers" 
          />
        </div>
        
        {showOffers && (
          <div className="mt-4 space-y-3">
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-green-600">TRENZZA10</h3>
              <p className="text-sm text-gray-600 mt-1">Get 10% off on your total order value above ₹5000</p>
              <p className="text-xs text-gray-500 mt-2">*Valid on all products</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-green-600">FREETRENZZA</h3>
              <p className="text-sm text-gray-600 mt-1">Get free delivery on orders above ₹2000</p>
              <p className="text-xs text-gray-500 mt-2">*Valid only for first 2 orders</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CouponSection.propTypes = {
  couponCode: PropTypes.string.isRequired,
  setCouponCode: PropTypes.func.isRequired,
  isCouponApplied: PropTypes.bool.isRequired,
  isFreeDelivery: PropTypes.bool.isRequired,
  applyCoupon: PropTypes.func.isRequired,
  removeCoupon: PropTypes.func.isRequired,
  showOffers: PropTypes.bool.isRequired,
  setShowOffers: PropTypes.func.isRequired
};

export default CouponSection; 