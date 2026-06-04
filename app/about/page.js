export default function AboutPage() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <section className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-400 to-slate-600 p-10 shadow-sm">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-200">About Us</p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                        Serving Patna Society Residents
                    </h1>
                </div>

                <div className="space-y-6 text-gray-800">
                    <p>
                        Patna Society Bazaar is a local marketplace built for society members in Patna.
                        It makes buying and selling easy within your neighborhood, connecting families,
                        cooks, cleaners, students, and small vendors around your society.
                    </p>

                    <p>
                        Our goal is to support community commerce by showcasing trusted products from
                        people you already know. Whether you need groceries, household essentials,
                        or specialty items, our marketplace helps you discover reliable vendors nearby.
                    </p>

                    <p>
                        The shop is designed for simple orders, safe delivery, and a friendlier
                        marketplace experience for every society in Patna.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-50 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Community Focus</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Only trusted society members can list items, so neighbors can shop with confidence.
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Local Convenience</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Find daily essentials and services in one place, with pickup and delivery options near you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
