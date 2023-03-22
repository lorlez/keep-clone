<script>
	export let name = 'Bar';
	export let url = '';
	export let isActive = false;
	export let redirect = true;

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('barclick', name);
	};
</script>

<a class:pointer-events-none={!redirect} href={url} on:click={handleClick}>
	<div class:bg-yellow-200={isActive} class="flex h-12 items-center rounded-r-full bg-white hover:bg-slate-400 ">
		<slot />
		<p class="ml-2">{name}</p>
	</div>
</a>
