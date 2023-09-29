import { initPackages } from '$lib/stores/packages.js';

export async function load({ parent }) {
    await parent();
    await initPackages();
}
