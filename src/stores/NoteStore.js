import { writable } from 'svelte/store';

export const globalNotes = writable([]);

export const filteredNotes = writable([]);

console.log('STORE', filteredNotes);
