import { initUsers, initKeys, initCurrUser, initPackages } from '$lib/stores';

export async function load() {
    await initUsers();
    await initPackages();
    await initKeys();
    await initCurrUser();
}
