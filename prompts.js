export function getInstructions(mode, style = "simple") {
    if  (mode === "summarise") {
        if (style === "simple"){
            return "Summarise the text in 5 bullet points.";
        }

        if (style === "role"){
            return ("You are a precise technical editor. " + "Summarise the text in 5 clear bullet points for a busy developer.");
        }

        if (style === "strict") {
            return ("Summarise the text in exactly 5 bullet points.\n" +
                "Requirements:\n" +
                "- Each bullet must be under 15 words.\n" +
                "- Do not add any introduction or conclusion.\n" +
                "- Output only the bullet points."
            );
        }
    }

     if (mode === "rewrite") {
    if (style === "simple") {
      return "Rewrite the text in a friendly professional tone in 3 short sentences.";
    }

    if (style === "role") {
      return (
        "You are a professional career writing assistant. " +
        "Rewrite the text in a confident, polished, professional tone."
      );
    }

    if (style === "strict") {
      return (
        "Rewrite the text into exactly three professional sentences.\n" +
        "Requirements:\n" +
        "- Keep the original meaning.\n" +
        "- Each sentence must be concise.\n" +
        "- Do not add new information.\n" +
        "- Output only the three sentences."
      );
    }
  }

  if (mode === "extract-json") {
    return (
      "Extract information and return ONLY valid JSON. No extra text.\n" +
      "Schema:\n" +
      '{ "name": null, "email": null, "skills": [], "experience": [] }\n' +
      "Rules: If missing use null or []; do not add extra fields; output must be valid JSON."
    );
  }

  return null;
}