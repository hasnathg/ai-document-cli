import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export async function readInput(inputValue){
    let text = "";

    if (fs.existsSync(inputValue)) {

        if (inputValue.toLowerCase().endsWith(".pdf")) {
            console.log("Reading text from PDF file..");

            const pdfBuffer = fs.readFileSync(inputValue);
            const pdfData = await pdfParse(pdfBuffer);

            text = pdfData.text;
        } else {
            console.log("Reading text from text file..");
            text = fs.readFileSync(inputValue, "utf-8");
        }
    } else {
        text = inputValue;
    }

    return text;


}

