import axios from 'axios';
import fs from 'fs';

async function getEmotes(pages, offset) {
	console.log('getting emotes for ' + pages + ' pages');
	let emotes = [];
	for (let i = 0; i < pages; i++) {
		try {
			let resp = await axios.post('https://api.7tv.app/v2/gql', {
				query: `query {
                    search_emotes(query: "", page: ${
						i + 1 + offset
					}, pageSize: 150, limit: 150, sortBy: "popularity", sortOrder: 0) {
                        name
                    }
                }`,
			});
			emotes.push(...resp.data.data.search_emotes.map((emote) => emote.name));
			console.log('got page ' + i);
		} catch (err) {
			console.log(err);
		}
	}

	return emotes;
}

getEmotes(30, 30).then((emotes) => {
	console.log(emotes.join('\n'));
	// fs.writeFileSync('emotes.txt', emotes.filter((e) => e.length === 5).join('\n'));
	fs.appendFileSync('emotes.txt', emotes.filter((e) => e.length === 5).join('\n'));
});
