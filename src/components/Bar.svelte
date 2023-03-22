<script>
	export let name = 'Bar';
	export let url = '';
</script>

<a href="/{url}">
	<div class="flex h-12 rounded-r-full bg-yellow-100 ">
		<slot />
		<p>{name}</p>
	</div>
</a>
