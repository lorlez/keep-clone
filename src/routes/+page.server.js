export async function load() {
	let photos = await fetch('https://jsonplaceholder.typicode.com/photos');
	let phdata = await photos.json();
	let notes = [];
	phdata.slice(0, 4).forEach((p, i) => {
		notes.push({
			title: p.title,
			imgurl: p.url,
			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
			id: i,
			pinned: false
		});
	});
	return { notes };
}
