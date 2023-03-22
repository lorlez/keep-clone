<script>
	export let id = 0;
	export let title = '';
	export let body = '';
	export let imgurl = '';
</script>

<div class="w-content ml-auto mr-auto mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white">
	<img src={imgurl} alt="content missing" />
	<h1 class="font-bold">{title}</h1>
	<h1>{body}</h1>
</div>
