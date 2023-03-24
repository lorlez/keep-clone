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
	<div
		class:bg-yellow-200={isActive}
		class="flex h-12 items-center rounded-r-full rounded-l-full bg-white pl-2 hover:bg-slate-400 sm:rounded-l-none "
	>
		<slot />
		<p class="ml-2 hidden sm:block">{name}</p>
	</div>
</a>
