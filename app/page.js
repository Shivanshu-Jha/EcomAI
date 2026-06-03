"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // function for handling search
  const handleSearch = async () => {
    const res = await fetch("/api/ai-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })

    const data = await res.json();
    if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else {
      setProducts([]); 
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Products
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-300 sm:text-4xl">
          Available Products
        </h1>

      </section>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center my-8 sm:flex-row sm:text-left">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search products..."
          className="w-full rounded-3xl border border-white bg-slate-600 px-4 py-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-2/3"
        />
        <button
          className="cursor-pointer rounded-xl bg-blue-500 px-4 py-3 text-white shadow-sm transition hover:bg-blue-600 hover:ring-2 sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-700 shadow-sm">
          <div className="mx-auto flex max-w-xs flex-col items-center justify-center gap-4">
            <div
              role="status"
              className="h-12 w-12 rounded-full border-4 border-slate-300 border-t-indigo-600 animate-spin"
            />
            <p className="text-sm font-medium text-slate-700">Loading products...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-amber-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="h-56 w-full overflow-hidden bg-slate-100 sm:h-64">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {product.category || "Uncategorized"}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">
                  {product.title}
                </h2>
                <p className="mt-3 max-h-16 overflow-hidden text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-slate-900">
                    ${product.price?.toFixed(2) ?? "0.00"}
                  </span>
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
