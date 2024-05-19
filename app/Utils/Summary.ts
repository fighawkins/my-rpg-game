export function summarizeResponses(responses: string[]): string {
    return responses.join(' ');
}

export function serializeResponses(responses: string[]): string {
    const summary = summarizeResponses(responses);
    return JSON.stringify({ summary });
}

export function appendToSummary(existingSummary: string, newSummary: string): string {
    return `${existingSummary} ${newSummary}`;
}

export function saveSummary(summary: string) {
    localStorage.setItem("rpgGameSummary", summary);
}

export function loadSummary(): string {
    return localStorage.getItem("rpgGameSummary") || "";
}
