<script>
	import Button from './Button.svelte';
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
	<img src={imgurl} alt="content missing" />
	<h1 class="font-bold">{title}</h1>
	<h1>{body}</h1>
	<Button callback={handleClick}>Delete</Button>
</div>
