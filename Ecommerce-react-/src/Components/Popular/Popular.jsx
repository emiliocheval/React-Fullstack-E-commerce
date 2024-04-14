import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';
import './Popular.css';

const Popular = () => {
    const { products, selectProduct } = useContext(ShopContext);
    const navigate = useNavigate();


    const displayedProducts = products.slice(0, 6);

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className='popular'>
            <h1>POPULAR</h1>
            <hr />
            <div className="popular-item">
                {displayedProducts.map(product => {
                    const imageUrls = Array.isArray(product.images) ? product.images : product.images.split(',');

                    return (
                        <div key={product._id} onClick={() => handleProductClick(product)}>
                            <Item productId={product._id} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;