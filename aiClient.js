import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function runAI({ instructions, input, mode }) {

    const response = await client.responses.create({
        model: "gpt-5-nano",
        instructions,
        input,
        reasoning: { effort: "low" },
        max_output_tokens: mpde === "extract-json" ? 300 : 200,
    });

    return response.output_text?.trim() || "";
    
}