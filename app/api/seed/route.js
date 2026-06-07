import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Process in chunks
async function embedInBatches(texts, batchSize = 5, delayMs = 6000) {
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
        const chunk = texts.slice(i, i + batchSize);

        const result = await gemini.models.embedContent({
            model: "gemini-embedding-001",
            contents: chunk,
        });

        allEmbeddings.push(...result.embeddings.map((e) => e.values));

        // Wait between batches to avoid rate limit
        if (i + batchSize < texts.length) {
            await sleep(delayMs);
        }
    }

    return allEmbeddings;
}

export async function GET() {
    try {
        await connectDB();
        await Product.deleteMany();

        const products = [
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
        ]

        const texts = products.map(
            (p) => `${p.title} ${p.description} ${p.category}`
        );

        // 5 products per batch, 2 second pause between batches
        const embeddings = await embedInBatches(texts, 5, 2000);

        const productsWithVectors = products.map((product, index) => ({
            ...product,
            embedding: embeddings[index],
        }));

        await Product.insertMany(productsWithVectors);
        return Response.json({ message: "Products seeded successfully" });

    } catch (error) {
        console.error(error.message);
        return Response.json({ message: "Error seeding products" });
    }
}