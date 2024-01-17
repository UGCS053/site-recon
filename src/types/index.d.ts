export {};
declare global {
    interface Window {
        store: any;
    }
}
window.store = window.store || {};
