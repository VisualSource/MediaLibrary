export const EVENT_SEARCH_PARAMS_KEY = "event-set-search-params";

export default function emitSearchParams(placeholder: string, type: string | undefined = undefined, bookmarked: boolean = false): void {
    window.dispatchEvent(new CustomEvent(EVENT_SEARCH_PARAMS_KEY, { detail: { placeholder, type, bookmarked } }));
}