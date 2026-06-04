"use client";

import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) setCart(JSON.parse(stored));
        } catch (e) {
            console.error("Failed to load cart from localStorage", e);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
    }, [cart]);

    const addItem = (product, quantity = 1) => {
        
        setCart((prev) => {
            const idx = prev.findIndex((p) => p._id === product._id);
            if (idx > -1) {
                const copy = [...prev];
                copy[idx].quantity = (copy[idx].quantity || 0) + quantity;
                return copy;
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeItem = (id) => setCart((prev) => prev.filter((p) => p._id !== id));

    const updateQuantity = (id, quantity) => {
        setCart((prev) => prev.map((p) => (p._id === id ? { ...p, quantity } : p)));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
