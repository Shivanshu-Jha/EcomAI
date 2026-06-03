import { GoogleGenAI } from "@google/genai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { query } = await req.json();

        const aiRes = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: "Convert this into a short product keyword and generate 10 comma separated keywords " + query }
                    ]
                }
            ]
        });

        const keyword = aiRes.output?.[0]?.content?.[0]?.text?.trim() || query.trim();
        console.log("AI-generated keyword:", keyword);

        await connectDB();
        const products = await Product.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        });

        return Response.json({ products });
    } catch (error) {
        console.error("Error in AI search:", error);
        return Response.json({ error: "Failed to perform AI search" });
    }
}
