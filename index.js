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

    console.log(`Estimated input tokens: ${estimatedTokens}`);

    if (wasTrimmed) {
      console.log("⚠️ Input too long. Trimming text...");
    }

    const instructions = getInstructions(mode, style);

    if (!instructions) {
      console.log("Invalid mode or style.");
      return;
    }

    console.log(`Mode: ${mode} | Style: ${style}`);

    const out = await runAI({
      instructions,
      input: safeText,
      mode,
    });

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