import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { lang = "es" } = await req.json();
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            return NextResponse.json({ error: "API Key missing" }, { status: 500 });
        }

        const prompt = `Dame otra frase inspiradora (que no hayas enviado hace poco) en ${lang}, con su autor. Responde solo con el formato JSON:
		{
		  "text": "Aquí la frase",
		  "author": "Aquí el autor"
		}`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        let quoteText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        quoteText = quoteText.replace(/```json/g, "").replace(/```/g, "").trim();

        let quote;
        try {
            quote = JSON.parse(quoteText);
        } catch (err) {
            console.error("Error parsing quote:", err);
            const defaultQuotes = lang === "es"
                ? [
                    {
                        text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
                        author: "Robert Collier"
                    },
                    {
                        text: "No dejes que el miedo te detenga, da el primer paso y sigue adelante.",
                        author: "Desconocido"
                    }
                ]
                : [
                    {
                        text: "The only way to do great work is to love what you do.",
                        author: "Steve Jobs"
                    },
                    {
                        text: "Believe you can and you're halfway there.",
                        author: "Theodore Roosevelt"
                    }
                ];
            quote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
        }

        return NextResponse.json(quote);
    } catch (error) {
        console.error("Error fetching quote:", error);
        return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
    }
}
