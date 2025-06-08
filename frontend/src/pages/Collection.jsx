import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [priceRange, setPriceRange] = useState(2000); // max price filter

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.some(cat => cat.toLowerCase() === item.category.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.some(sub => sub.toLowerCase() === item.subCategory.toLowerCase())
      );
    }

    productsCopy = productsCopy.filter(item => item.price <= priceRange);

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let sortedCopy = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        sortedCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sortedCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-4 sm:px-10">

      {/* FILTER SIDEBAR */}
      <div className="w-full sm:w-64">
        <p onClick={() => setShowFilter(!showFilter)} className="flex items-center justify-between cursor-pointer text-lg font-semibold mb-4 sm:mb-6">
          Filters
          <img className={`h-3 sm:hidden transform duration-300 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`${showFilter ? '' : 'hidden'} sm:block space-y-6`}>
          {/* Category Filter */}
          <div className="border p-4 rounded shadow-sm">
            <p className="font-medium mb-2 text-sm">Categories</p>
            <div className="space-y-2 text-sm text-gray-600">
              {['SHIRTS', 'T-SHIRTS', 'PANTS'].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input type="checkbox" value={cat} onChange={toggleCategory} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Brand/SubCategory Filter */}
          <div className="border p-4 rounded shadow-sm">
            <p className="font-medium mb-2 text-sm">Select a Brand</p>
            <div className="space-y-2 text-sm text-gray-600">
              {['USPOLO-ASSGN', 'RARE-RABBIT', 'ALLEN SOLLY', 'SNITCH', 'TOMMY HILFIGER', 'SPYKAR'].map((brand) => (
                <label key={brand} className="flex items-center gap-2">
                  <input type="checkbox" value={brand} onChange={toggleSubCategory} />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border p-4 rounded shadow-sm">
            <p className="font-medium mb-2 text-sm">Price Range: ₹0 - ₹{priceRange}</p>
            <input
              type="range"
              min={0}
              max={2000}
              step={100}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* MAIN PRODUCT AREA */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select onChange={(e) => setSortType(e.target.value)} className="border rounded px-3 py-1 text-sm">
            <option value="relavent">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterProducts.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-full">No products match your filters.</p>
          ) : (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
