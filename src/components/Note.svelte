<script>
	import Button from './Button.svelte';
	import Pin from 'svelte-material-icons/Pin.svelte';
	import Trash from 'svelte-material-icons/Delete.svelte';

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
		console.log('inside handle pin');
		dispatch('notepin', id);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="mb-4 overflow-hidden rounded-lg border border-slate-300 bg-white"
	on:click|capture={() => {
		if (!isEditing) isEditing = true;
	}}
>
	<div class="right-0 float-right flex w-max bg-blue-300">
		<Button callback={handleDel}>
			<Trash color="gray" size="28" />
		</Button>
		<Button callback={handlePin}>
			<Pin color={pinned ? 'black' : 'gray'} size="28" />
		</Button>
	</div>
	{#if imgurl}
		<img src={imgurl} alt="content missing" />
	{/if}

	{#if isEditing}
		<input class="w-full" type="text" bind:value={title} placeholder="Titolo" />
	{:else if title}
		<h1 class="text-lg font-bold">{title}</h1>
	{/if}
	<div class="flex">
		{#if isEditing}
			<textarea class="flex-1" bind:value={body} placeholder="Nota" />
		{:else}
			<p>{body}</p>
		{/if}
		{#if isEditing}
			<Button
				callback={() => {
					isEditing = false;
					if (body === '' && title === '') {
						handleDel();
					}
				}}
			>
				<h1>CHIUDI</h1>
			</Button>
		{/if}
	</div>
</div>
