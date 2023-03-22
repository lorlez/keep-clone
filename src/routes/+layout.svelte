<script>
	import '../app.postcss';
	import Bar from '../components/Bar.svelte';
	import Button from '../components/Button.svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Search from 'svelte-material-icons/Magnify.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Grid from 'svelte-material-icons/Grid.svelte';
	import Settings from 'svelte-material-icons/Cog.svelte';
	import App from 'svelte-material-icons/Apps.svelte';

	let notes = [
		{
			title: 'Titolo test 1',
			id: 0,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veniam error necessitatibus',
			imgurl: 'https://via.placeholder.com/600/92c952'
		},
		{
			title: 'Titolo test 2',
			id: 1,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veniam error necessitatibus',
			imgurl: 'https://via.placeholder.com/600/92c952'
		},
		{
			title: 'Titolo test 3',
			id: 2,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veniam error necessitatibus',
			imgurl: 'https://via.placeholder.com/600/92c952'
		}
	];

	const handleInput = (str) => {
		notes = notes.filter((note) => note.body.includes(str));
	};
</script>

<header class="flex h-16 items-center justify-between border-b border-b-slate-300 bg-white">
	<div class="flex bg-blue-300">
		<Button size="128" text="A test icon">
			<Menu size="30" color="grey" />
		</Button>
		<div class="items-center">
			<h1>TITLE</h1>
		</div>
	</div>
	<div class="flex rounded-lg bg-slate-100">
		<Button size="128" text="A test icon">
			<Search size="30" color="grey" />
		</Button>
		<input class="bg-transparent" type="text" placeholder="Cerca" />
		<Button size="128" text="A test icon">
			<Close size="30" color="grey" />
		</Button>
	</div>
	<div class="flex bg-yellow-300">
		<Button size="128" text="A test icon">
			<Menu size="30" color="grey" />
		</Button>
		<Button size="128" text="A test icon">
			<Grid size="30" color="grey" />
		</Button>
		<Button size="128" text="A test icon">
			<Settings size="30" color="grey" />
		</Button>
		<Button size="128" text="A test icon">
			<App size="30" color="grey" />
		</Button>
		<Button size="128" text="A test icon">
			<Menu size="30" color="grey" />
		</Button>
	</div>
</header>
<div class="flex h-screen">
	<aside class="w-64 bg-white">
		<div class="m-t-12">
			<Bar name="Test" url="">
				<Settings size="30" color="grey" />
			</Bar>
			<Bar name="Test">
				<Settings size="30" color="grey" />
			</Bar>
			<Bar name="Test">
				<Settings size="30" color="grey" />
			</Bar>
		</div>
		<div class="absolute bottom-0">
			<a href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt">Licenze open-source</a>
		</div>
	</aside>
	<main class="flex-1 bg-white">
		<slot />
	</main>
</div>
