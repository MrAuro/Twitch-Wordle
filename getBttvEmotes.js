// https://api.betterttv.net/3/emotes/shared/top?offset=0&limit=50

import axios from 'axios';
import fs from 'fs';

async function getEmotes(pages, offset) {
	console.log('getting emotes for ' + pages + ' pages');
	let emotes = [];
	for (let i = 0; i < pages; i++) {
		try {
			let resp = await axios.get(`https://api.betterttv.net/3/emotes/shared/top?offset=${i * 100}&limit=100`);
			emotes.push(...resp.data.map((emote) => emote.emote.code));
			console.log('got page ' + i);
		} catch (err) {
			console.log(err);
		}
	}

	return emotes;
}

getEmotes(10, 0).then((emotes) => {
	console.log(emotes.join('\n'));
	// fs.writeFileSync('emotes.txt', emotes.filter((e) => e.length === 5).join('\n'));
	fs.appendFileSync('bttvemotes.txt', emotes.filter((e) => e.length === 5).join('\n'));
});
