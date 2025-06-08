import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 49;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    // Add request interceptor
    api.interceptors.request.use(
        (config) => {
            console.log('Request Config:', {
                url: config.url,
                method: config.method,
                headers: config.headers,
                data: config.data
            });
            if (token) {
                config.headers.token = token;
            }
            return config;
        },
        (error) => {
            console.error('Request Error:', error);
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    api.interceptors.response.use(
        (response) => {
            console.log('Response:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });
            return response;
        },
        (error) => {
            console.error('API Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });

            // Handle specific error cases
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (error.response.status) {
                    case 401:
                        // Clear all auth-related data
                        setToken('');
                        localStorage.removeItem('token');
                        setCartItems({});
                        toast.error('Session expired. Please login again.');
                        navigate('/login');
                        break;
                    
                    default:
                        // Only show error toast if there's a specific error message
                        if (error.response.data?.message) {
                            toast.error(error.response.data.message);
                        }
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No response from server. Please check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('Error setting up request');
            }
            return Promise.reject(error);
        }
    );

    // Add cleanup function
    const cleanupAuth = () => {
        setToken('');
        localStorage.removeItem('token');
        setCartItems({});
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        // Check if user is logged in
        if (!token) {
            toast.info('Please login to add items to cart');
            navigate('/login');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        try {
            console.log('Adding to cart:', { itemId, size, backendUrl });
            await api.post('/api/cart/add', { itemId, size });
        } catch (error) {
            console.error('Cart Error:', error);
            // Error is already handled by interceptor
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await api.post('/api/cart/update', { itemId, size, quantity });

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await api.get('/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Products Error:', error);
            // Error is already handled by interceptor
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await api.post('/api/cart/get', {}, {
                headers: { token }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error('Get Cart Error:', error);
            // Error is already handled by interceptor
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, api, cleanupAuth
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export { api };
export default ShopContextProvider;