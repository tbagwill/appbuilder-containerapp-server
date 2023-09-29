import { writable } from 'svelte/store';

let loadedPref;

export const interfacePref = writable({
    homeImage: '/earth_cut.png',
    homeLink: 'https:/google.com',
    theme: 'business'
});

export async function initInterface() {
    if (loadedPref) {
        interfacePref.set(loadedPref);
    }
}
