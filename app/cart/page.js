"use client";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { cart, total, updateQuantity, removeItem, clearCart } = useContext(CartContext);

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-[#f5f5dc]">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-center">
                    <p className="text-[#f5f5dc]">Your cart is empty.</p>
                    <Link href="/" className="mt-4 inline-block text-sm text-amber-600 underline">
                        Continue shopping
                    </Link>
                </div>
            ) : (
                <div className="mt-8 space-y-6">
                    {cart.map((item, index) => {
                        
                        const qty = item.quantity || 1;
                        const unit = Number(item.price || 0);

                        return (
                            <div key={item._id || index} className="flex items-center gap-4 rounded-2xl border p-4">
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-400">No image</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-[#f5f5dc]">{item.title}</h3>
                                        <button onClick={() => removeItem(item._id)} className="text-sm text-red-600 cursor-pointer hover:scale-110">Remove</button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-6">
                                        <div className="text-[#f5f5dc] text-sm flex flex-col">Unit Price
                                            <span>${unit.toFixed(2)}</span>
                                        </div>

                                        <div className="ml-auto flex items-center gap-2">
                                            <label className="text-sm text-[#f5f5dc]">Qty</label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={qty}
                                                onChange={(e) => updateQuantity(item._id, Number(e.target.value || 1))}
                                                className="w-20 rounded-md border px-2 py-1 bg-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center justify-between rounded-2xl border p-4">
                        <div>
                            <p className="text-sm text-[#f5f5dc]">Total</p>
                            <p className="text-xl font-semibold text-[#f5f5dc]">${total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => clearCart()} className="rounded-md border px-4 py-2 text-sm">Clear</button>
                            <Link href="/checkout" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">Checkout</Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
