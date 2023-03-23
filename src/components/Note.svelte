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

	const handleClick = () => {
		console.log('clicked');
		dispatch('notedel', id);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="mb-4 overflow-hidden rounded-lg border border-slate-300 bg-white"
	on:click={() => {
		if (!isEditing) isEditing = true;
	}}
>
	<div class="right-0 float-right w-14 bg-blue-300">
		<Button callback={handleClick}>
			<Pin color={pinned ? 'black' : 'gray'} size="28" />
		</Button>
	</div>
	{#if imgurl}
		<img src={imgurl} alt="content missing" />
	{/if}

	{#if isEditing}
		<input class="h-12" type="text" bind:value={title} />
	{:else if title}
		<h1 class="text-lg font-bold">{title}</h1>
	{/if}
	<div class="flex">
		{#if isEditing}
			<textarea bind:value={body} />
		{:else}
			<p>{body}</p>
		{/if}
		{#if isEditing}
			<Button
				callback={() => {
					console.log('Closing edit');
					isEditing = false;
					console.log(isEditing);
				}}
			>
				<Trash size="30" color="grey" />
			</Button>
		{/if}
	</div>
</div>
