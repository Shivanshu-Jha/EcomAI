import { GoogleGenAI } from "@google/genai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { query } = await req.json();

        // const aiRes = await client.models.generateContent({
        //     model: "gemini-2.5-flash",
        //     contents: [
        //         {
        //             role: "user",
        //             parts: [
        //                 { text: "Convert this into a short product keyword and generate 10 comma separated keywords " + query }
        //             ]
        //         }
        //     ]
        // });




        // const keyword = aiRes.output?.[0]?.content?.[0]?.text?.trim() || query.trim();

        // convert this query to embeddings
        const embeddingRes = await client.models.embedContent({
            model: "gemini-embedding-001",
            contents: [query]
        });

        const embedding = embeddingRes.embeddings?.[0]?.values;

        if (!embedding) {
            throw new Error("Failed to get embedding from Gemini");
        }

        await connectDB();


        // find products with similar embeddings using cosine similarity
        const products = await Product.aggregate([
            {
                $addFields: {
                    similarity: {
                        $meta: "vectorSimilarity",
                        queryVector: embedding,
                        vectorField: "embedding",
                    },
                },
            },
            {
                $sort: { similarity: -1 },
            },
            {
                $limit: 10,
            },
        ]);

        return Response.json({ products });
    } catch (error) {
        console.error("Error in AI search:", error);
        return Response.json({ error: "Failed to perform AI search" });
    }
}

export async function GET(req) {
    try {

        await connectDB();


        return Response.json({ products });
    } catch (error) {
        console.error("Error in AI search:", error);
        return Response.json({ error: "Failed to perform AI search" });
    }
}
