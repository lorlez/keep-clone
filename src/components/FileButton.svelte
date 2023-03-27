<script>
	import Image from 'svelte-material-icons/Image.svelte';
	export let callback = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="m-0 h-10 w-10 cursor-pointer">
	<div class="relative h-full w-full items-center justify-center overflow-hidden rounded-full hover:bg-slate-200">
		<input class="absolute top-1 opacity-0" type="file" on:change={(e) => callback(e.target.files[0])} />
		<div class="flex h-full items-center justify-center">
			<Image color="grey" size="28" />
		</div>
	</div>
</div>
