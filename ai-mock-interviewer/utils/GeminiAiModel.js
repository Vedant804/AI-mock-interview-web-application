import Groq from "groq-sdk";

// Update your .env.local with NEXT_PUBLIC_GROQ_API_KEY from console.groq.com
const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Required for client-side Next.js calls
});

export const chatSession = {
    sendMessage: async (prompt) => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 1,
                max_tokens: 8192,
                top_p: 0.95,
                response_format: { type: "json_object" } // Forces Groq to return JSON
            });

            // This wrapper mimics Gemini's response structure so your other 
            // files don't need major changes to their .text() calls.
            return {
                response: {
                    text: () => chatCompletion.choices[0].message.content,
                },
            };
        } catch (error) {
            console.error("Groq API Error:", error);
            throw error;
        }
    },
};
