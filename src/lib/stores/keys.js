import { writable } from 'svelte/store';

export const allKeys = writable([]);

export async function initKeys() {
    allKeys.set();
}
