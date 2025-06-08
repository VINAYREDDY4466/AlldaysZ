import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
    
    // Calculate original price (assuming 35% discount)
    const originalPrice = Math.round(price / 0.65);
    const discount = Math.round((originalPrice - price) / originalPrice * 100);

    return (
        <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer flex flex-col h-full' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm '>{name}</p>
            <div className='flex items-center gap-2 mt-auto '>
                <p className='text-sm font-medium'>{currency}{price}</p>
                <p className='text-sm text-gray-500 line-through'>{currency}{originalPrice}</p>
                <p className='text-sm text-green-600'>({discount}% OFF)</p>
            </div>
        </Link>
    )
}

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ProductItem
