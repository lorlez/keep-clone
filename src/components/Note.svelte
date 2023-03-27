<script>
	import Button from './Button.svelte';
	import Pin from 'svelte-material-icons/Pin.svelte';
	import Trash from 'svelte-material-icons/Delete.svelte';
	import DelImage from 'svelte-material-icons/ImageOff.svelte';
	import FileButton from './FileButton.svelte';
	import { editingID } from '../stores/NoteStore';

	export let id = 0;
	export let title = '';
	export let body = '';
	export let imgurl = '';
	export let pinned = false;
	export let isEditing = false;

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	const handleDel = () => {
		dispatch('notedel', id);
	};

	const handlePin = () => {
		pinned = !pinned;
	};

	const handleImgDel = () => {
		imgurl = '';
	};

	const handleOpenForm = () => {
		editingID.set(id);
		//if (!isEditing) isEditing = true;
	};

	const handleCloseForm = () => {
		isEditing = false;
		editingID.set(-1);
		dispatch('notedit', { id, body, title, imgurl, pinned });
		if (body === '' && title === '' && imgurl === '') {
			handleDel();
		}
	};

	const addImg = (file) => {
		const fr = new FileReader();
		fr.readAsDataURL(file);
		fr.addEventListener('load', () => {
			imgurl = fr.result;
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative m-4 w-64 overflow-hidden rounded-lg border border-slate-300" on:click|capture={handleOpenForm}>
	{#if imgurl}
		{#if isEditing}
			<div class="absolute right-0">
				<Button callback={handleImgDel}>
					<DelImage color="gray" size="28" />
				</Button>
			</div>
		{/if}
		<img draggable={false} class="w-full" src={imgurl} alt="content missing" />
	{/if}
	{#if isEditing}
		<textarea
			class="ml-2 mr-2 w-full overflow-hidden text-lg font-semibold outline-none"
			bind:value={title}
			placeholder="Titolo"
		/>
	{:else if title}
		<h1 class="ml-2 mr-2 text-lg font-semibold">{title}</h1>
	{/if}
	{#if isEditing}
		<textarea
			class="ml-2 mr-2 mt-0 h-full w-full resize-y overflow-hidden outline-none"
			bind:value={body}
			placeholder="Nota"
		/>
	{:else}
		<p class="ml-2 mr-2 font-sans">{body}</p>
	{/if}
	{#if isEditing}
		<div class="flex justify-between">
			<div class="flex">
				<FileButton callback={addImg} />
				<Button callback={handleDel}>
					<Trash color="gray" size="28" />
				</Button>
				<Button callback={handlePin}>
					<Pin color={pinned ? 'black' : 'gray'} size="28" />
				</Button>
			</div>
			<Button callback={handleCloseForm}>
				<h1 class="text-xs font-semibold">CHIUDI</h1>
			</Button>
		</div>
	{/if}
</div>
