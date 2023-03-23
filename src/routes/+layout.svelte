<script>
	import '../app.postcss';
	import { globalNotes } from '../stores/NoteStore';
	import { filteredNotes } from '../stores/NoteStore';
	import Bar from '../components/Bar.svelte';
	import Button from '../components/Button.svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Search from 'svelte-material-icons/Magnify.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Grid from 'svelte-material-icons/Grid.svelte';
	import Settings from 'svelte-material-icons/Cog.svelte';
	import App from 'svelte-material-icons/Apps.svelte';
	import Reload from 'svelte-material-icons/Reload.svelte';
	import User from 'svelte-material-icons/Account.svelte';
	import Lightbulb from 'svelte-material-icons/LightbulbOutline.svelte';
	import Bell from 'svelte-material-icons/BellOutline.svelte';
	import Pen from 'svelte-material-icons/Pen.svelte';
	import Archive from 'svelte-material-icons/ArchiveArrowDownOutline.svelte';
	import Trash from 'svelte-material-icons/Delete.svelte';
	import Note from 'svelte-material-icons/Note.svelte';

	let currentPage = 'Note';

	const changeActive = (e) => {
		currentPage = e.detail;
	};

	/*const handleInput = (e) => {
		filteredNotes.set(
			$globalNotes.filter((n) => {
				console.log(
					'n.body is',
					n.body,
					'e.target.value is ',
					e.target.value,
					'includes si ',
					n.body.includes(e.target.value)
				);
				return (
					n.body.toLowerCase().includes(e.target.value.toLowerCase()) ||
					n.title.toLowerCase().includes(e.target.value.toLowerCase())
				);
			})
		);
	};*/
</script>

<header class="flex h-16 items-center justify-between border-b border-b-slate-300 bg-white">
	<div class="w-30 flex items-center">
		<Button>
			<Menu size="30" color="grey" />
		</Button>
		{#if currentPage === 'Note'}
			<Note color="#dbde43" size="40" />
		{/if}
		<div class="flex items-center">
			<h1 class="text-lg font-bold text-slate-500">{currentPage === 'Note' ? 'Keep' : currentPage}</h1>
		</div>
	</div>
	<div class="flex h-12 w-1/2 items-center justify-between rounded-lg bg-slate-100">
		<Button>
			<Search size="30" color="grey" />
		</Button>
		<input class="flex-1 border-none bg-transparent focus:outline-none" type="text" placeholder="Cerca" />
		<Button>
			<Close size="30" color="grey" />
		</Button>
	</div>
	<div class="flex">
		<Button>
			<Reload size="30" color="grey" />
		</Button>
		<Button>
			<Grid size="30" color="grey" />
		</Button>
		<Button>
			<Settings size="30" color="grey" />
		</Button>
		<Button>
			<App size="30" color="grey" />
		</Button>
		<Button>
			<User size="30" color="grey" />
		</Button>
	</div>
</header>
<div class="flex">
	<aside class="flex w-64 flex-col justify-between bg-white">
		<div class="m-t-12">
			<Bar isActive={currentPage === 'Note'} name="Note" url="./" on:barclick={changeActive}>
				<Lightbulb size="30" color="grey" />
			</Bar>
			<Bar isActive={currentPage === 'Promemoria'} name="Promemoria" url="reminders" on:barclick={changeActive}>
				<Bell size="30" color="grey" />
			</Bar>
			<Bar name="Modifica Etichette" redirect={false} on:barclick={changeActive}>
				<Pen size="30" color="grey" />
			</Bar>
			<Bar isActive={currentPage === 'Archivio'} name="Archivio" url="archive" on:barclick={changeActive}>
				<Archive size="30" color="grey" />
			</Bar>
			<Bar isActive={currentPage === 'Cestino'} name="Cestino" url="trash" on:barclick={changeActive}>
				<Trash size="30" color="grey" />
			</Bar>
		</div>
		<div class="mb-4 ml-4 text-sm">
			<a href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt">Licenze open-source</a>
		</div>
	</aside>
	<main class="h-screen flex-1 overflow-y-scroll bg-white">
		<slot />
	</main>
</div>
