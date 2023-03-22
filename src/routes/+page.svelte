<script>
	import Note from '../components/Note.svelte';
	import NoteForm from '../components/NoteForm.svelte';

	export let data;
	let notes = data.notes;

	const addNote = (e) => {
		notes = [...notes, e.detail];
	};

	const deleteNote = (e) => {
		notes = notes.filter((n) => n.id != e.detail);
	};
</script>

<div class="w-display h-display">
	<NoteForm on:noteadd={addNote} />
	<div class="ml-auto mr-auto h-96 w-1/2">
		{#each notes as note (note.id)}
			<Note {...note} on:notedel={deleteNote} />
		{/each}
	</div>
</div>
