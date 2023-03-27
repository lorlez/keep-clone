<script>
	import Note from '../components/Note.svelte';
	import NoteForm from '../components/NoteForm.svelte';
	import { onMount } from 'svelte';
	import { globalNotes, filteredNotes } from '../stores/NoteStore';
	import { flip } from 'svelte/animate';

	export let data;
	let hovering = false;

	let mynotes = [];
	let datanotes = data.notes;

	onMount(() => {
		mynotes = JSON.parse(window.localStorage.getItem('mynotes') || '[]');
	});

	$: {
		globalNotes.set([...mynotes, ...datanotes]);
		console.log('globalNotes updated');
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

	const editNote = (e) => {
		mynotes = mynotes.map((n) => {
			if (n.id === e.detail.id) return e.detail;
			else return n;
		});
		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));

		datanotes = datanotes.map((n) => {
			if (n.id === e.detail.id) return e.detail;
			else return n;
		});
	};

	const notePin = (e) => {
		mynotes = mynotes.map((n) => {
			if (n.id === e.detail) return { ...n, pinned: !n.pinned };
			else return n;
		});
		window.localStorage.setItem('mynotes', JSON.stringify(mynotes));

		datanotes = datanotes.map((n) => {
			if (n.id === e.detail.id) return { ...n, pinned: !n.pinned };
			else return n;
		});
	};

	const dragstart = (event, draggedNote) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.setData('text/plain', JSON.stringify(draggedNote)); //start
	};

	const drop = (event, targetNote) => {
		let targetIndex = -1;
		let draggedIndex = -1;
		let draggedNote = JSON.parse(event.dataTransfer.getData('text/plain'));

		$globalNotes.forEach((n, i) => {
			if (n.id === draggedNote.id) {
				draggedIndex = i;
				console.log('found draggedItem index', draggedIndex);
			} else if (n.id === targetNote.id) {
				targetIndex = i;
				console.log('found targetItem index', targetIndex);
			}
		});

		globalNotes.set(
			$globalNotes.map((n, i) => {
				if (i === targetIndex) {
					console.log('swapped target with dragged');
					return draggedNote;
				} else if (i === draggedIndex) {
					console.log('swapped dragged with target');
					return targetNote;
				} else {
					return n;
				}
			})
		);

		//window.localStorage.setItem('mynotes', JSON.stringify(mynotes));
	};
</script>

<div class="ml-auto mr-auto">
	<NoteForm on:noteadd={addNote} />

	{#if $filteredNotes.filter((n) => n.pinned).length > 0}
		<h1 class="ml-12 mb-2 text-xs font-bold">APPUNTATE</h1>
	{/if}
	<div class="ml-12 mr-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each $filteredNotes as note (note.id)}
			{#if note.pinned}
				<Note {...note} on:notedel={deleteNote} on:notedit={editNote} on:notepin={notePin} />
			{/if}
		{/each}
	</div>

	{#if $filteredNotes.filter((n) => n.pinned).length > 0 && $filteredNotes.filter((n) => !n.pinned).length > 0}
		<h1 class="ml-12 mb-2 text-xs font-bold">ALTRE</h1>
	{/if}
	<div class="ml-12 mr-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each $filteredNotes as note, index (note.id)}
			{#if !note.pinned}
				<div
					on:dragstart={(e) => dragstart(e, note)}
					draggable={true}
					class="bg-transparent"
					on:drop|preventDefault={(event) => drop(event, note)}
					ondragover="return false"
					on:dragenter={() => (hovering = index)}
					class:is-active={hovering === index}
				>
					<Note {...note} on:notedel={deleteNote} on:notedit={editNote} on:notepin={notePin} />
				</div>
			{/if}
		{/each}
	</div>
</div>
