export const EVENT_LEAVE_SEARCH = "event-leave-search";

export default function emitLeaveSearch() {
    window.dispatchEvent(new CustomEvent(EVENT_LEAVE_SEARCH));
}