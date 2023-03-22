<script>
	import Check from 'svelte-material-icons/CheckboxMarkedoutline.svelte';
	import Brush from 'svelte-material-icons/BrushOutline.svelte';
	import Image from 'svelte-material-icons/Image.svelte';
	import Pin from 'svelte-material-icons/PinOutline.svelte';

	import Button from '../components/Button.svelte';

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	let isOpen = false;

	let title = '';
	let body = '';
	let imgurl = '';
	let id = 0;

	const handleClick = () => {
		console.log('clicked');
		dispatch('noteadd', { title, body, imgurl, id: Math.random() });
		toggleForm();
	};

	const toggleForm = () => {
		isOpen = !isOpen;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="ml-auto mr-auto mt-12 flex w-1/2 items-center justify-between rounded-lg border border-slate-300 drop-shadow-lg"
>
	{#if isOpen}
		<form class="overflow-hidden">
			<div class="flex w-full justify-between">
				<input bind:value={title} type="text" placeholder="Titolo" class="shadow-none" />
				<Button>
					<Pin color="grey" size="28" />
				</Button>
			</div>
			<!-- svelte-ignore a11y-autofocus -->
			<textarea bind:value={body} autofocus placeholder="Scrivi una nota..." />
			<div class="flex justify-between">
				<Button>
					<Image color="grey" size="28" />
				</Button>
				<Button
					callback={() => {
						if (body != '') handleClick();
					}}>Chiudi</Button
				>
			</div>
		</form>
	{:else}
		<p on:click={toggleForm} class="ml-2 hover:cursor-text">Scrivi una nota...</p>
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
