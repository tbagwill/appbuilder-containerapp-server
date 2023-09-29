import { writable, derived } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import toast from 'svelte-french-toast';

export const allPackages = writable([]);

export async function initPackages() {
    let { data: packages, error: err } = await supabase.from('packages').select('*');
    let loadedPacks = [];

    packages.map((pack) => {
        loadedPacks.push(pack.document);
    });

    allPackages.set(loadedPacks);
}

export const incomingPackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted === '');
});

export const activePackages = derived([allPackages], ([$packages]) => {
    return $packages.filter((pack) => pack.accepted !== '');
});

export async function activatePackage(id) {
    toast.success('Package status changed.');
}

export async function deactivatePackage(id) {
    toast.success('Package status changed.');
}
