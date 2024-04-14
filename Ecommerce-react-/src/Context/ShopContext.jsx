import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCartItems(getDefaultCart(products));
    }, [products]);

    useEffect(() => {
        const totalAmount = getTotalCartAmount();
        console.log('Total Amount:', totalAmount);
    }, [cartItems, products]);

    const getDefaultCart = (products) => {
        let cart = {};
        for (let index = 0; index < products.length; index++) {
            cart[products[index]._id] = 0;
        }
        return cart;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
        }));
    };

    const clearCart = () => {
        setCartItems(getDefaultCart(products));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const product = products.find(product => product._id === productId);
            if (product) {
                totalAmount += product.price * cartItems[productId];
            }
        }
        return totalAmount;
    };

    const sendCartProductsToAPI = async () => {
        try {
            const cartProducts = Object.keys(cartItems)
                .filter(itemId => cartItems[itemId] > 0)
                .map(itemId => {
                    return {
                        productId: itemId,
                        quantity: cartItems[itemId]
                    };
                });

            const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: cartProducts })
            });

            if (response.ok) {
                console.log('Order created successfully');

                const responseData = await response.json();
                console.log('Response:', responseData);
            } else {
                throw new Error('Failed to create order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const GetTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartAmount,
        sendCartProductsToAPI,
        products,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        GetTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
