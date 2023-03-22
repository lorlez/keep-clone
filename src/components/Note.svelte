<script>
	import Button from './Button.svelte';
	import Pin from 'svelte-material-icons/PinOutline.svelte';

	export let id = 0;
	export let title = '';
	export let body = '';
	export let imgurl = '';

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	const handleClick = () => {
		console.log('clicked');
		dispatch('notedel', id);
	};
</script>

<div class="w-content ml-auto mr-auto mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white">
	<div class="right-0 float-right w-14 bg-blue-300">
		<Button callback={handleClick}>
			<Pin color="grey" size="28" />
		</Button>
	</div>
	{#if imgurl}
		<img src={imgurl} alt="content missing" />
	{/if}
	{#if title}
		<h1 class="text-lg font-bold">{title}</h1>
	{/if}
	<h1>{body}</h1>
</div>
