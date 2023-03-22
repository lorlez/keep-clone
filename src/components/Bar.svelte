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
	<div class:bg-orange-300={isActive} class="flex h-12 rounded-r-full bg-white hover:bg-slate-400 ">
		<slot />
		<p>{name}</p>
	</div>
</a>
