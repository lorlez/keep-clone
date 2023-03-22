<script>
	export let size = 10;
	export let text = '';
	export let callback = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={callback} class="w-{size} h-{size} m-2 bg-transparent">
	<div class="flex h-full w-full items-center justify-center rounded-full bg-transparent hover:bg-slate-200">
		<slot />
	</div>
	{#if text}
		<div class="absolute p-2 text-xs top-{size} rounded-lg bg-black font-bold text-white opacity-70">
			{text}
		</div>
	{/if}
</div>
