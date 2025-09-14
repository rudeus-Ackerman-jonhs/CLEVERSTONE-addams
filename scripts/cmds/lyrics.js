const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
 config: {
 name: "lyrics",
 version: "2.0",
 author: "AceGun||NZR",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Get lyrics of a song 💔"
 },
 longDescription: {
 en: "Fetch the lyrics of any song with its artist name and artwork using the song title."
 },
 category: "lyrics",
 guide: {
 en: "{pn} <song name>\n\nExample:\n{pn} dil"
 }
 },

 onStart: async function ({ api, event, args }) {
 try {
 const songName = args.join(" ");
 if (!songName) {
 return api.sendMessage("😗🚬", event.threadID, event.messageID);
 }

 const response = await axios.get(`https://lyricstx.vercel.app/youtube/lyrics?title=${encodeURIComponent(songName)}`);
 const data = response.data;

 if (!data.lyrics) {
 return api.sendMessage("Baka you searching for an impossible songs 💀", event.threadID, event.messageID);
 }

 const { artist_name, track_name, artwork_url, lyrics } = data;

 const tmpDir = path.join(__dirname, 'tmp');
 if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
 const imgPath = path.join(tmpDir, `${Date.now()}_cover.jpg`);
 const imgResponse = await axios.get(artwork_url, { responseType: 'arraybuffer' });
 fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

 api.sendMessage({
 body: `💔 title: ${track_name}\n 💔 article: ${artist_name}\n\n 💔 lyrics:\n${lyrics}`,
 attachment: fs.createReadStream(imgPath)
 }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

 } catch (err) {
 console.error("❌ | Error fetching lyrics:", err.message);
 return api.sendMessage(`❌ An error occurred: ${err.message}`, event.threadID, event.messageID);
 }
 }
};