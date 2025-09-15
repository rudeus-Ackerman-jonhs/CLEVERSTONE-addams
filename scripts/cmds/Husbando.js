const axios = require("axios");

module.exports = {
  config: {
    name: "husbando",
    version: "1.0",
    author: "rudeus ackerman",
    role: 0,
    category: "fun",
    shortDescription: "Envoie une image aléatoire d'un husbando",
    longDescription: "Cette commande récupère une image aléatoire d'un husbando stylé/sexy depuis une API et l'envoie dans la conversation.",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    try {
      // API husbando
      const url = "https://api.waifu.pics/sfw/husbando"; 

      const res = await axios.get(url);
      const imageUrl = res.data.url;

      api.sendMessage(
        {
          body: "✨ Voici ton husbando ✨",
          attachment: await global.utils.getStreamFromURL(imageUrl)
        },
        event.threadID,
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Erreur lors de la récupération du husbando.", event.threadID, event.messageID);
    }
  }
};