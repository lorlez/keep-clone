<script>
	export let callback = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={callback} class="h-12 w-12 cursor-pointer bg-transparent">
	<div class="flex h-full w-full items-center justify-center rounded-full bg-transparent hover:bg-slate-200">
		<slot />
	</div>
</div>
