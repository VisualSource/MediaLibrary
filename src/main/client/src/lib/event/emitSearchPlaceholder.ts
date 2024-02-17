export const EVENT_SEARCH_PLACEHOLDER_KEY = "event-set-search-placeholder";

export default function emitSearchPlaceholder(value: string): void {
    window.dispatchEvent(new CustomEvent(EVENT_SEARCH_PLACEHOLDER_KEY, { detail: { value } }));
}