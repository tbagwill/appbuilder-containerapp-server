import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

export const allUsers = writable([]);

export async function initUsers() {
    allUsers.set();
}

export const currUser = writable([]);

export async function initCurrUser() {
    currUser.set();
}

export const adminUsers = derived([allUsers], ([$users]) => {
    return $users.filter((user) => user.role === 'admin');
});
