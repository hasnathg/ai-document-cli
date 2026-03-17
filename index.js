import { readInput } from "./fileReader.js";
import { trimToTokenLimit } from "./utils.js";
import { getInstructions } from "./prompts.js";
import { runAI } from "./aiClient.js";

async function main() {
  try {
    const args = process.argv.slice(2);

    const modeIndex = args.indexOf("--mode");
    const mode = modeIndex !== -1 ? args[modeIndex + 1] : "summarise";

    const styleIndex = args.indexOf("--style");
    const style = styleIndex !== -1 ? args[styleIndex + 1] : "simple";

    const textArgs = args.filter((_, i) => {
      const isModeFlag = i === modeIndex || i === modeIndex + 1;
      const isStyleFlag = i === styleIndex || i === styleIndex + 1;
      return !isModeFlag && !isStyleFlag;
    });

    const inputValue = textArgs.join(" ").trim();

    if (!inputValue) {
      console.log('Usage: node index.js --mode summarise --style simple "Your text here"');
      console.log("Modes: summarise | rewrite | extract-json");
      console.log("Styles: simple | role | strict");
      return;
    }

    const text = await readInput(inputValue);

    if (!text) {
      console.log("No readable input found.");
      return;
    }

    const { estimatedTokens, safeText, wasTrimmed } =
      trimToTokenLimit(text, 2000);

    const instructions = getInstructions(mode, style);

    if (!instructions) {
      console.log("Invalid mode or style.");
      return;
    }

    const result = await runAI({
      instructions,
      input: safeText,
      mode,
    });

    const out = result.output;

    console.log("\n--- Request Summary ---");
    console.log(`Model: ${result.model}`);
    console.log(`Status: ${result.status}`);
    console.log(`Mode: ${mode}`);
    console.log(`Style: ${style}`);
    console.log(`Estimated input tokens: ${estimatedTokens}`);
    console.log(`Trimmed input: ${wasTrimmed ? "Yes" : "No"}`);

    if (result.usage) {
      console.log(`Actual input tokens: ${result.usage.input_tokens ?? "N/A"}`);
      console.log(`Actual output tokens: ${result.usage.output_tokens ?? "N/A"}`);
      console.log(`Total tokens: ${result.usage.total_tokens ?? "N/A"}`);
    }

    console.log("\nAI Output:\n");

    if (!out) {
      console.log("Model returned empty output.");
      return;
    }

    if (mode === "extract-json") {
      try {
        const parsed = JSON.parse(out);
        console.log(JSON.stringify(parsed, null, 2));
      } catch {
        console.log("Not valid JSON. Raw output:");
        console.log(out);
      }
      return;
    }

    console.log(out);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();