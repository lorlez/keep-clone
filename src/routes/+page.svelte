<script>
	import Note from '../components/Note.svelte';
	import NoteForm from '../components/NoteForm.svelte';
	import { onMount } from 'svelte';
	import { globalNotes, filteredNotes } from '../stores/NoteStore';

	export let data;

	let mynotes = [];
	let datanotes = data.notes;

	onMount(() => {
		mynotes = JSON.parse(window.localStorage.getItem('mynotes') || '[]');
	});

	$: {
		globalNotes.set([...mynotes, ...datanotes]);
	}

	const addNote = (e) => {
		console.log('adding NOTE');
		mynotes = [e.detail, ...mynotes];
		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));
	};

	const deleteNote = (e) => {
		mynotes = mynotes.filter((n) => {
			return n.id != e.detail;
		});

		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));
		datanotes = datanotes.filter((n) => {
			return n.id != e.detail;
		});
	};

	const togglePin = (e) => {
		console.log('Inside toggle pin');
		mynotes = mynotes.map((n) => {
			if (n.id === e.detail) return { ...n, pinned: !n.pinned };
			else return n;
		});
		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));

		datanotes = datanotes.map((n) => {
			if (n.id === e.detail) return { ...n, pinned: !n.pinned };
			else return n;
		});
	};
</script>

<div class="ml-auto mr-auto">
	<NoteForm on:noteadd={addNote} />

	{#if $filteredNotes.filter((n) => n.pinned).length > 0}
		<h1 class="ml-12 mb-2 text-xs font-bold">APPUNTATE</h1>
	{/if}
	<div class="ml-12 mr-12 grid grid-cols-4">
		{#each $filteredNotes as note (note.id)}
			{#if note.pinned}
				<Note {...note} on:notedel={deleteNote} on:notepin={togglePin} />
			{/if}
		{/each}
	</div>

	{#if $filteredNotes.filter((n) => n.pinned).length > 0 && $filteredNotes.filter((n) => !n.pinned).length > 0}
		<h1 class="ml-12 mb-2 text-xs font-bold">ALTRE</h1>
	{/if}
	<div class="ml-12 mr-12 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
		{#each $filteredNotes as note (note.id)}
			{#if !note.pinned}
				<Note {...note} on:notedel={deleteNote} on:notepin={togglePin} />
			{/if}
		{/each}
	</div>
</div>
