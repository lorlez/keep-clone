<script>
	import Check from 'svelte-material-icons/CheckboxMarkedoutline.svelte';
	import Brush from 'svelte-material-icons/BrushOutline.svelte';
	import Image from 'svelte-material-icons/Image.svelte';
	import Pin from 'svelte-material-icons/Pin.svelte';
	import DelImage from 'svelte-material-icons/ImageOff.svelte';

	import Button from '../components/Button.svelte';

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	let isOpen = false;
	let isDragging = false;

	let title = '';
	let body = '';
	let imgurl = '';
	let pinned = false;
	let id = 0;

	const handleDrop = (e) => {
		isOpen = true;
		isDragging = false;
		addImg(e.dataTransfer.files[0]);
	};

	const handleClose = () => {
		console.log('handling CLOSE');
		if (body != '' || title != '' || imgurl != '') {
			dispatch('noteadd', { title, body, imgurl, pinned, id: Math.random() });
		}
		title = '';
		body = '';
		imgurl = '';
		pinned = false;
		id = 0;
		toggleForm();
	};

	const toggleForm = () => {
		isOpen = !isOpen;
	};

	const togglePin = () => {
		pinned = !pinned;
	};

	const addImg = (file) => {
		const fr = new FileReader();
		fr.readAsDataURL(file);
		fr.addEventListener('load', () => {
			imgurl = fr.result;
			console.log('Image url is ', imgurl);
		});
	};

	const delImg = () => {
		imgurl = '';
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:dragover|preventDefault={() => {
		console.log('DRAGGING OVER');
		isDragging = true;
	}}
	on:dragleave|preventDefault={() => {
		console.log('LEAVING DRAG');
		isDragging = false;
	}}
	on:drop|preventDefault={handleDrop}
	class="mb-2 ml-auto mr-auto mt-12 flex w-1/2 items-center justify-between rounded-lg border border-slate-300 drop-shadow-lg"
>
	{#if isOpen && !isDragging}
		<form class="w-full overflow-hidden">
			{#if imgurl}
				<Button callback={delImg}>
					<DelImage color="gray" size="28" />
				</Button>
				<img src={imgurl} alt="BOH" />
			{/if}
			<div class="flex justify-between">
				<input bind:value={title} type="text" placeholder="Titolo" class="flex-1 focus:outline-none" />
				<Button callback={togglePin}>
					<Pin color={pinned ? 'black' : 'gray'} size="28" />
				</Button>
			</div>
			<!-- svelte-ignore a11y-autofocus -->
			<textarea class="w-full focus:outline-none" bind:value={body} autofocus placeholder="Scrivi una nota..." />
			<div class="flex justify-between">
				<Button>
					<Image color="grey" size="28" />
				</Button>
				<input type="file" on:change={(e) => addImg(e.target.files[0])} />
				<Button callback={handleClose}>
					<h1>Chiudi</h1>
				</Button>
			</div>
		</form>
	{:else if isDragging}
		<div class="m-4 w-full border-2 border-dashed border-slate-300  text-center">TRASCINA IMMAGINE QUI</div>
	{:else}
		<p on:click={toggleForm} class="ml-2 h-full flex-1 hover:cursor-text">Scrivi una nota...</p>
		<div class="flex">
			<Button>
				<Check color="grey" size="28" />
			</Button>
			<Button>
				<Brush color="grey" size="28" />
			</Button>
			<Button>
				<Image color="grey" size="28" />
			</Button>
		</div>
	{/if}
</div>
