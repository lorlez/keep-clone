<script>
	import Button from './Button.svelte';
	import Pin from 'svelte-material-icons/Pin.svelte';
	import Trash from 'svelte-material-icons/Delete.svelte';
	import DelImage from 'svelte-material-icons/ImageOff.svelte';
	import { isDragging } from '../stores/NoteStore';

	export let id = 0;
	export let title = '';
	export let body = '';
	export let imgurl = '';
	export let pinned = false;
	let isEditing = false;

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
		if (!isEditing) isEditing = true;
	};

	const handleCloseForm = () => {
		isEditing = false;
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
<div class="m-4 w-64 overflow-hidden rounded-lg border border-slate-300 bg-white" on:click|capture={handleOpenForm}>
	{#if isEditing}
		<div class="flex justify-between ">
			<input class="appearance-none" type="file" on:change={(e) => addImg(e.target.files[0])} />
			<Button callback={handleDel}>
				<Trash color="gray" size="28" />
			</Button>
			<Button callback={handlePin}>
				<Pin color={pinned ? 'black' : 'gray'} size="28" />
			</Button>
			{#if imgurl}
				<Button callback={handleImgDel}>
					<DelImage color="gray" size="28" />
				</Button>
			{/if}
			<Button callback={handleCloseForm}>
				<h1 class="text-sm">CHIUDI</h1>
			</Button>
		</div>
	{/if}

	{#if imgurl}
		<img draggable={false} class="w-full" src={imgurl} alt="content missing" />
	{/if}
	{#if isEditing}
		<input class="w-full" type="text" bind:value={title} placeholder="Titolo" />
	{:else if title}
		<h1 class="text-lg font-bold">{title}</h1>
	{/if}
	{#if isEditing}
		<textarea class="flex-1" bind:value={body} placeholder="Nota" />
	{:else}
		<p>{body}</p>
	{/if}
</div>
