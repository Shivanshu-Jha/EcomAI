import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, customer, total } = body || {};

    // Basic shape validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    }

    if (!customer || !customer.name || !customer.address || !customer.phone) {
      return new Response(JSON.stringify({ error: "Customer information is incomplete" }), { status: 400 });
    }

    // Validate items and compute total server-side
    let computedTotal = 0;
    for (const [i, it] of items.entries()) {
      if (!it || !it._id) {
        return new Response(JSON.stringify({ error: `Item at index ${i} missing _id` }), { status: 400 });
      }

      const price = Number(it.price);
      const qty = Number(it.quantity || 1);

      if (Number.isNaN(price) || price < 0) {
        return new Response(JSON.stringify({ error: `Invalid price for item ${it._id}` }), { status: 400 });
      }
      if (!Number.isInteger(qty) || qty <= 0) {
        return new Response(JSON.stringify({ error: `Invalid quantity for item ${it._id}` }), { status: 400 });
      }

      computedTotal += price * qty;
    }

    // Allow small rounding differences (1 cent)
    const diff = Math.abs(computedTotal - Number(total || 0));
    if (diff > 0.01) {
      return new Response(JSON.stringify({ error: "Total does not match cart items", computedTotal }), { status: 400 });
    }

    await connectDB();

    const order = await Order.create({ items, customer, total: computedTotal });

    return new Response(JSON.stringify({ id: order._id }), { status: 201 });
  } catch (err) {
    console.error("Error creating order:", err);
    return new Response(JSON.stringify({ error: "Failed to create order" }), { status: 500 });
  }
}
