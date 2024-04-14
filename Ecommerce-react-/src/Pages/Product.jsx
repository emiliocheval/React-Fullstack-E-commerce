import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

import { ShopContext } from '../Context/ShopContext';

const Product = () => {
    const { products } = useContext(ShopContext);
    const { productId } = useParams();
    const product = products.find((e) => e.id === Number(productId));

    return (
        <div>
            <ProductDisplay />
        </div>
    );
}

export default Product;
