# ai-document-cli

A modular Node.js CLI tool for processing text and documents with LLMs.

It supports:
- text summarisation
- text rewriting
- structured JSON extraction
- input from plain text, `.txt` files, and `.pdf` files

This project was built as part of an AI engineering learning roadmap focused on:
- API integration
- prompt engineering
- document ingestion
- token-aware safeguards
- modular backend architecture

---

## Features

- **Summarise** text into bullet points
- **Rewrite** text in different prompt styles
- **Extract JSON** from unstructured text
- Accept input from:
  - direct CLI text
  - `.txt` files
  - `.pdf` files
- Estimate input token size
- Trim oversized input safely
- Validate JSON output
- Log request metadata and token usage

---

## Project Structure

```text
ai-document-cli
├─ index.js
├─ aiClient.js
├─ prompts.js
├─ utils.js
├─ fileReader.js
├─ .env
├─ .gitignore
└─ package.json