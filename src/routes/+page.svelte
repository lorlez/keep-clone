<script>
	import Note from '../components/Note.svelte';
	import NoteForm from '../components/NoteForm.svelte';
	import { onMount } from 'svelte';

	export let data;

	console.log('data is ', data);

	let mynotes = [];
	let datanotes = data.notes;
	let notes = [];

	onMount(() => {
		mynotes = JSON.parse(window.localStorage.getItem('mynotes') || '[]');
		console.log('onMount my notes are: ', notes);
	});

	$: {
		notes = [...mynotes, ...datanotes];
		console.log(notes);
	}

	const addNote = (e) => {
		mynotes = [e.detail, ...mynotes];
		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));
	};

	const deleteNote = (e) => {
		mynotes = mynotes.filter((n) => {
			return n.id != e.detail;
		});

		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));
		console.log('mynotes is now ', mynotes);

		datanotes = datanotes.filter((n) => {
			return n.id != e.detail;
		});

		console.log('datanotes is now ', datanotes);
	};

	const clearStore = () => {
		mynotes = [];
		window.localStorage.setItem('mynotes', JSON.stringify([]));
	};
</script>

<!--<button on:click={clearStore}>CLEAR STORE</button>-->
<div class="w-display h-display">
	<NoteForm on:noteadd={addNote} />
	<div class="ml-auto mr-auto w-1/2">
		{#if notes.filter((n) => n.pinned).length > 0}
			<h1 class="ml-2 mb-2 text-xs font-bold">APPUNTATE</h1>
		{/if}
		{#each notes as note (note.id)}
			{#if note.pinned}
				<Note {...note} on:notedel={deleteNote} />
			{/if}
		{/each}
	</div>
	<div class="ml-auto mr-auto w-1/2">
		{#if notes.filter((n) => n.pinned).length > 0 && notes.filter((n) => !n.pinned).length > 0}
			<h1 class="ml-2 mb-2 text-xs font-bold">ALTRE</h1>
		{/if}
		{#each notes as note (note.id)}
			{#if !note.pinned}
				<Note {...note} on:notedel={deleteNote} />
			{/if}
		{/each}
	</div>
</div>
