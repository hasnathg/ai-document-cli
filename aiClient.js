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
        max_output_tokens: mode === "extract-json" ? 300 : 200,
    });

    return {
        output: response.output_text?.trim() || "",
        usage: response.usage || null,
        model: response.model || "unknown-model",
        status: response.status || "unknown-status",
    };
    }