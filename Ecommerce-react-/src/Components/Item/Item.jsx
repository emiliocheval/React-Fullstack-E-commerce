import React, { useState, useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchData();
      }, [productId]);


    if (!product) {
        return null;
    }

    const { _id, name, images } = product;

    return (
        <Link to={`/product/${_id}`} className="product-link" onClick={() => window.scrollTo(0, 0)}>
            <div className='item'>
                <img src={Array.isArray(images) ? images[0] : images} alt="" />
                <h2>{product.name}</h2>
                <p>{product.price} Kr</p>
            </div>
        </Link>
    );
}

export default Item;
