export function estimateTokens(text) {
    return Math.ceil(text.length /4);
}

export function trimToTokenLimit(text, maxInputTokens = 2000){
    const estimatedTokens = estimateTokens(text);

    if (estimatedTokens > maxInputTokens){
        return {
            estimatedTokens,
            safeText : text.slice(0, maxInputTokens*4),
            wasTrimmed: true
        };
    }

    return {
        estimatedTokens,
        safeText : text,
        wasTrimmed: false
    };
}