import { useContext, useState, useEffect } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import DeliveryInfoForm from '../components/checkout/DeliveryInfoForm'
import PaymentSection from '../components/checkout/PaymentSection'
import CouponSection from '../components/checkout/CouponSection'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [isLoading, setIsLoading] = useState(false);
    const { navigate, cartItems, setCartItems, getCartAmount, delivery_fee, products, api } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    const [orderCount, setOrderCount] = useState(0);
    const [isFreeDelivery, setIsFreeDelivery] = useState(false);
    const [hasUsedFreeDelivery, setHasUsedFreeDelivery] = useState(false);

    const refreshOrderCount = async () => {
        try {
            const response = await api.post('/api/order/ordercount');
            if (response.data.success) {
                const newCount = response.data.orderCount;
                setOrderCount(newCount);
                if (newCount > 2 && isFreeDelivery) {
                    setIsFreeDelivery(false);
                    setCouponCode('');
                    toast.info('Free delivery coupon removed as you have more than 2 orders');
                }
            } else {
                toast.error('Failed to get order count');
            }
        } catch (error) {
            console.error('Error getting order count:', error);
            toast.error('Failed to get order count');
        }
    };

    useEffect(() => {
        refreshOrderCount();
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const applyCoupon = async () => {
        if (!couponCode) {
            toast.error('Please enter a coupon code');
            return;
        }

        const code = couponCode.toUpperCase();
        const cartTotal = getCartAmount();
        
        if (code === 'TRENZZA10') {
            if (cartTotal < 5000) {
                toast.error('Minimum order value of ₹5000 required for this coupon');
                return;
            }
            if (isFreeDelivery) {
                toast.error('Please remove free delivery coupon first');
                return;
            }
            setIsCouponApplied(true);
            setIsFreeDelivery(false);
            toast.success('Coupon applied successfully!');
        } else if (code === 'FREETRENZZA') {
            if (cartTotal < 2000) {
                toast.error('Minimum order value of ₹2000 required for free delivery');
                return;
            }
            if (hasUsedFreeDelivery) {
                toast.error('You have already used the free delivery coupon');
                return;
            }
            if (orderCount >= 2) {
                toast.error('Free delivery coupon is only valid for first 2 orders');
                return;
            }
            if (isCouponApplied) {
                toast.error('Please remove the 10% discount coupon first');
                return;
            }
            setIsFreeDelivery(true);
            setIsCouponApplied(false);
            setHasUsedFreeDelivery(true);
            toast.success('Free delivery applied successfully!');
        } else {
            toast.error('Invalid coupon code');
        }
    }

    const removeCoupon = () => {
        setIsCouponApplied(false);
        setIsFreeDelivery(false);
        setCouponCode('');
        toast.info('Coupon removed');
    }

    const calculateTotal = () => {
        let total = getCartAmount();
        
        // Add delivery fee if not free delivery
        if (!isFreeDelivery) {
            total += delivery_fee;
        }
        
        // Apply 10% discount if coupon applied
        if (isCouponApplied) {
            total = total - (total * 0.1);
        }
        
        return total;
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await api.post('/api/order/verifyRazorpay', response)
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.error('Payment verification error:', error)
                    toast.error(error.response?.data?.message || 'Payment verification failed')
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        
        if (!termsAccepted || !privacyAccepted) {
            toast.error('Please accept the Terms of Service and Privacy Policy')
            return
        }

        setIsLoading(true);
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: calculateTotal()
            }
            
            let orderSuccess = false;
            
            switch (method) {
                case "cod": {
                    const response = await api.post("/api/order/place", orderData)
                    if (response.data.success) {
                        orderSuccess = true;
                        setCartItems({})
                        navigate("/orders")
                    }
                    break
                }

                case "stripe": {
                    const responseStripe = await api.post("/api/order/stripe", orderData)
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    }
                    break
                }

                case "razorpay": {
                    const responseRazorpay = await api.post("/api/order/razorpay", orderData)
                    if (responseRazorpay.data.success) {
                        console.log(responseRazorpay.data.order)
                        initPay(responseRazorpay.data.order)
                    }
                    break
                }

                default:
                    break
            }

            if (orderSuccess) {
                await refreshOrderCount();
            }
        } catch (error) {
            console.error('Order submission error:', error)
            toast.error(error.response?.data?.message || 'Failed to place order')
        } finally {
            setIsLoading(false);
        }
    }

    const LoadingSpinner = () => (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col lg:flex-row justify-between gap-6 py-10 px-4 border-t bg-gray-50 min-h-screen"
        >
            {/* LEFT - Delivery Info */}
            <DeliveryInfoForm
                formData={formData}
                onChangeHandler={onChangeHandler}
                termsAccepted={termsAccepted}
                privacyAccepted={privacyAccepted}
                setTermsAccepted={setTermsAccepted}
                setPrivacyAccepted={setPrivacyAccepted}
                isLoading={isLoading}
            />

            {/* RIGHT - Payment Info */}
            <div className="w-full lg:max-w-[400px] mt-10 lg:mt-0 flex flex-col gap-8">
                <CartTotal />

                {/* Coupon Section */}
                <CouponSection
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    isCouponApplied={isCouponApplied}
                    isFreeDelivery={isFreeDelivery}
                    applyCoupon={applyCoupon}
                    removeCoupon={removeCoupon}
                    showOffers={showOffers}
                    setShowOffers={setShowOffers}
                />

                {/* Payment Section */}
                <PaymentSection
                    method={method}
                    setMethod={setMethod}
                    isLoading={isLoading}
                    getCartAmount={getCartAmount}
                    delivery_fee={delivery_fee}
                    isFreeDelivery={isFreeDelivery}
                    isCouponApplied={isCouponApplied}
                    calculateTotal={calculateTotal}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-2 text-white rounded ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } flex items-center justify-center gap-2`}
                >
                    {isLoading && <LoadingSpinner />}
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </form>
    );
}

export default PlaceOrder
