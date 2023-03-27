import { writable } from 'svelte/store';

export const globalNotes = writable([]);

export const filteredNotes = writable([]);

export const editingID = writable(-1);
