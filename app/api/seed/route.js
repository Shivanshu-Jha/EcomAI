import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        await Product.deleteMany();

        await Product.insertMany(
            [
                {
                    title: "Wireless Bluetooth Headphones",
                    description: "High-quality over-ear headphones with noise cancellation.",
                    price: 79.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Smartphone Stand",
                    description: "Adjustable desk stand for smartphones and tablets.",
                    price: 19.99,
                    category: "Accessories",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Gaming Mouse",
                    description: "Ergonomic mouse with customizable RGB lighting.",
                    price: 49.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Yoga Mat",
                    description: "Non-slip mat for yoga and fitness exercises.",
                    price: 29.99,
                    category: "Fitness",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Stainless Steel Water Bottle",
                    description: "Insulated bottle keeps drinks hot or cold for hours.",
                    price: 24.99,
                    category: "Home & Kitchen",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "LED Desk Lamp",
                    description: "Adjustable lamp with touch controls and USB charging port.",
                    price: 39.99,
                    category: "Home & Office",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Portable Power Bank",
                    description: "10000mAh power bank with fast charging support.",
                    price: 34.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Running Shoes",
                    description: "Lightweight and breathable shoes for daily running.",
                    price: 59.99,
                    category: "Footwear",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Wireless Keyboard",
                    description: "Compact keyboard with Bluetooth connectivity.",
                    price: 44.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Coffee Maker",
                    description: "Automatic drip coffee maker with reusable filter.",
                    price: 89.99,
                    category: "Home & Kitchen",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Fitness Tracker",
                    description: "Smart wearable with heart rate and sleep monitoring.",
                    price: 69.99,
                    category: "Fitness",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Noise Cancelling Earbuds",
                    description: "Compact earbuds with immersive sound quality.",
                    price: 99.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Laptop Backpack",
                    description: "Water-resistant backpack with padded laptop compartment.",
                    price: 54.99,
                    category: "Accessories",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Electric Kettle",
                    description: "Fast-boiling kettle with auto shut-off feature.",
                    price: 39.99,
                    category: "Home & Kitchen",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Smartwatch",
                    description: "Touchscreen smartwatch with fitness and notification features.",
                    price: 129.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Office Chair",
                    description: "Ergonomic chair with lumbar support and adjustable height.",
                    price: 149.99,
                    category: "Furniture",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Wireless Charger",
                    description: "Fast wireless charging pad compatible with all Qi devices.",
                    price: 29.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Digital Alarm Clock",
                    description: "LED display clock with dual alarms and USB charging.",
                    price: 24.99,
                    category: "Home & Office",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Electric Toothbrush",
                    description: "Rechargeable toothbrush with multiple cleaning modes.",
                    price: 59.99,
                    category: "Personal Care",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Camping Tent",
                    description: "Waterproof 2-person tent for outdoor adventures.",
                    price: 129.99,
                    category: "Outdoors",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Bluetooth Speaker",
                    description: "Portable speaker with deep bass and long battery life.",
                    price: 79.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Air Fryer",
                    description: "Oil-free cooking appliance for healthy meals.",
                    price: 99.99,
                    category: "Home & Kitchen",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Smart LED Bulb",
                    description: "Wi-Fi enabled bulb with color-changing options.",
                    price: 19.99,
                    category: "Home & Office",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Hiking Backpack",
                    description: "Durable backpack with multiple compartments for trekking.",
                    price: 89.99,
                    category: "Outdoors",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Robot Vacuum Cleaner",
                    description: "Automatic vacuum with smart navigation and app control.",
                    price: 199.99,
                    category: "Home Appliances",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Sunglasses",
                    description: "UV-protected stylish sunglasses for everyday wear.",
                    price: 29.99,
                    category: "Fashion",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Electric Scooter",
                    description: "Foldable scooter with long battery range.",
                    price: 349.99,
                    category: "Outdoors",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Gaming Keyboard",
                    description: "Mechanical keyboard with RGB backlighting.",
                    price: 89.99,
                    category: "Electronics",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Cookware Set",
                    description: "Non-stick pots and pans set for everyday cooking.",
                    price: 149.99,
                    category: "Home & Kitchen",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Smart Door Lock",
                    description: "Keyless entry lock with fingerprint and app control.",
                    price: 199.99,
                    category: "Home Security",
                    image: "https://picsum.photos/500/300"
                },
                {
                    title: "Blue Sneaker",
                    description: "Comfortable and stylish blue sneakers for casual wear.",
                    price: 49.99,
                    category: "Footwear",
                    image: "https://picsum.photos/500/300"
                }
            ]
        )
        return Response.json({ message: "Products seeded successfully" });
    } catch (error) {
        console.error(error.message);
        return Response.json({ message: "Error seeding products" });
    }
}