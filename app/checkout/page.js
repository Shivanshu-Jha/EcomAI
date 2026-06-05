"use client";

import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
    const { cart, total, clearCart } = useContext(CartContext);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);

    const placeOrder = async () => {
        setError(null);
        if (!name || !address || !phone) {
            setError("Please fill out all delivery fields.");
            return;
        }
        if (!cart || cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                items: cart.map((it) => ({ _id: it._id, title: it.title, price: it.price, quantity: it.quantity || 1, image: it.image })),
                customer: { name, address, phone },
                total,
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to place order');
            }

            const data = await res.json();
            setOrderId(data.id);
            clearCart();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-16">
                <div className="rounded-3xl border bg-slate-900 p-8 text-center">
                    <h2 className="text-2xl font-semibold text-[#f5f5dc]">Thank you — your order has been placed</h2>
                    <p className="mt-4 text-sm text-[#f5f5dc]">Order ID: <strong className="text-[#f5f5dc]">{orderId}</strong></p>
                    <p className="mt-2 text-sm text-slate-600">We will contact you shortly with delivery details.</p>
                </div>
            </main>
        )
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <section className="rounded-3xl border border-slate-200 bg-slate-900 p-10 shadow-sm">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Checkout</p>
                    <h1 className="mt-3 text-3xl font-semibold text-[#f5f5dc] sm:text-4xl">
                        Complete Your Order
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                        Review your items and submit your delivery details to place an order with your society marketplace.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <div className="space-y-6">
                        <div className="rounded-3xl bg-linear-to-br from-slate-400 to-slate-600 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
                            <p className="mt-3 text-sm leading-6 text-gray-800">
                                Add products to your cart from the home page. Your order will show up here for final confirmation.
                            </p>

                            <div className="mt-6 space-y-4">
                                {cart && cart.length > 0 ? (
                                    <>
                                        {cart.map((it) => (
                                            <div key={it._id} className="rounded-3xl border border-slate-200 bg-white p-4">
                                                <div className="flex items-center justify-between text-sm text-slate-500">
                                                    <div>
                                                        <div className="font-medium text-slate-900">{it.title}</div>
                                                        {it.quantity > 1 && (
                                                            <div className="text-xs text-slate-500">Quantity: {it.quantity}</div>
                                                        )}
                                                    </div>
                                                    <div className="font-semibold text-slate-900">${((it.price || 0) * (it.quantity || 1)).toFixed(2)}</div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Subtotal</span>
                                                <span className="font-semibold text-slate-900">${(total || 0).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Delivery fee</span>
                                                <span className="font-semibold text-slate-900">$10.00</span>
                                            </div>
                                        </div>

                                        <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                            <div className="flex items-center justify-between text-sm text-slate-900">
                                                <span>Total</span>
                                                <span className="text-lg font-semibold">${((total || 0) + 10).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                        <div className="text-sm text-slate-500">Your cart is empty.</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-linear-to-tr from-slate-400 to-slate-600 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Contact your society admin for payment support, delivery windows, or order changes.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-slate-50 p-6">
                        <h2 className="text-lg font-semibold text-slate-900">Delivery Information</h2>
                        <form className="mt-6 space-y-5" onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
                            <div>
                                <label className="text-sm font-medium text-slate-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Your full name"
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700" htmlFor="address">
                                    Society / Address
                                </label>
                                <input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    placeholder="e.g., Sector 5, North Bihar Society"
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
                                />
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95 disabled:opacity-60"
                            >
                                {loading ? 'Placing order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
