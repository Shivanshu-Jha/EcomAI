export default function CheckoutPage() {
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
                                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <span>Sample item from local seller</span>
                                        <span className="font-semibold text-slate-900">$125.00</span>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">
                                        This placeholder will show real cart items once you connect checkout functionality.
                                    </p>
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
                                        <span className="text-lg font-semibold">$135.00</span>
                                    </div>
                                </div>
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
                        <form className="mt-6 space-y-5">
                            <div>
                                <label className="text-sm font-medium text-slate-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
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
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
                                />
                            </div>

                            <button
                                type="button"
                                className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
