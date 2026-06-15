// theme.svelte.ts
let currentTheme = $state(typeof window !== 'undefined' ? localStorage.getItem('score7:theme') || 'auto' : 'auto');

export const themeState = {
    get current() { return currentTheme },
    set current(value) {
        currentTheme = value;
        localStorage.setItem('score7:theme', value);
        // Add logic to update document.documentElement classes here if needed
    }
};