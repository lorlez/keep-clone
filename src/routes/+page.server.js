//fetchare
var photos = []; //await fetch('https://jsonplaceholder.typicode.com/photos').then((r) => r.json());

export function load() {
	let notes = [];
	/*slice(0, 4).*/ photos.forEach((p, i) => {
		notes.push({
			title: p.title,
			imgurl: p.url,
			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
			id: i
		});
	});
	return { notes };
}
