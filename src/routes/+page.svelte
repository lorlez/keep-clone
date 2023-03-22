<script>
	import Note from '../components/Note.svelte';
	import NoteForm from '../components/NoteForm.svelte';
	import { mynotes } from './NoteStore.js';

	export let data;
	console.log('mynotes are: ' + mynotes);
	let notes = $mynotes.concat(data.notes);

	const addNote = (e) => {
		console.log('e.detail is: ' + e.detail);
		mynotes.update((nts) => nts.push(e.detail));
		notes = [...notes, e.detail];
	};

	const deleteNote = (e) => {
		mynotes.update((nts) => nts.filter((n) => n.id != e.detail));
		notes = notes.filter((n) => n.id != e.detail);
	};

	const clearStore = () => {
		mynotes.set([]);
	};
</script>

<button on:click={clearStore}>CLEAR STORE</button>
<div class="w-display h-display">
	<NoteForm on:noteadd={addNote} />
	<div class="ml-auto mr-auto h-96 w-1/2">
		{#each notes as note (note.id)}
			<Note {...note} on:notedel={deleteNote} />
		{/each}
	</div>
</div>
