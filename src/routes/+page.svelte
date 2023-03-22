<script>
	import Button from '../components/Button.svelte';
	import Check from 'svelte-material-icons/CheckboxMarkedoutline.svelte';
	import Brush from 'svelte-material-icons/BrushOutline.svelte';
	import Image from 'svelte-material-icons/Image.svelte';
	import Note from '../components/Note.svelte';

	export let data;
	let notes = data.notes;
</script>

<div class="w-display h-display">
	<div
		class="ml-auto mr-auto mt-12 flex h-12 w-1/2 items-center justify-between rounded-lg border border-slate-300 bg-white drop-shadow-lg hover:cursor-text"
	>
		<p class="ml-2">Scrivi una nota...</p>
		<div class="flex">
			<Button size="12" text="Nuovo elenco">
				<Check color="grey" size="28" />
			</Button>
			<Button size="12" text="Nuova nota con disegno">
				<Brush color="grey" size="28" />
			</Button>
			<Button size="12" text="Nuova immagine">
				<Image color="grey" size="28" />
			</Button>
		</div>
	</div>
	<div class="ml-auto mr-auto h-96 w-1/2">
		{#each notes as note (note.id)}
			<Note {...note} />
		{/each}
	</div>
</div>
