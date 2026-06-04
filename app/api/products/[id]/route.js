import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
    const { id } = await params;
    await connectDB();
    try {
        const product = await Product.findById(id);
        if (!product) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
        return Response.json(product);
    } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 });
    }
}
