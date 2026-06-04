"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { CartContext } from "../../context/CartContext";
import Link from "next/link";

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!product) return <div className="p-8">Product not found</div>;

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="h-96 w-full overflow-hidden rounded-2xl bg-slate-100">
                    {product.image ? (
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                    )}
                </div>

                <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{product.category || "Uncategorized"}</p>
                    <h1 className="mt-3 text-2xl font-semibold text-[#f5f5dc]">{product.title}</h1>
                    <p className="mt-4 text-lg text-[#f5f5dc]">${product.price?.toFixed(2) ?? "0.00"}</p>
                    <p className="mt-6 text-sm leading-6 text-[#dfdfce]">{product.description}</p>

                    <div className="mt-8 flex items-center gap-4">
                        <button
                            onClick={() => {
                                addItem(product, 1);
                                router.push('/cart');
                            }}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 active:scale-95"
                        >
                            Add to Cart
                        </button>

                        <Link href="/" className="text-sm text-amber-600 underline ">
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
