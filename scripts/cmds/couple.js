const axios = require("axios");

module.exports = {
  config: {
    name: "couple",
    aliases: ["love", "poeme"],
    version: "1.0",
    author: "rudeus",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: "Crée un poème ou musique d'amour pour un couple",
    longDescription: "Mentionnez deux personnes et le bot écrira un poème ou un texte romantique sur elles.",
    guide: {
      en: "-couple @user1 @user2 : génère un poème romantique pour le couple"
    }
  },

  onStart: async function({ api, event, message, args }) {
    const mentions = Object.keys(event.mentions || {});

    if (mentions.length < 2) {
      return message.reply("⚠️ Merci de mentionner **deux personnes** pour générer le poème.");
    }

    const names = mentions.map(id => event.mentions[id].replace("@", ""));
    const prompt = `Écris un poème d'amour ou une chanson romantique pour un couple : ${names[0]} et ${names[1]}. Le texte doit être poétique, chaleureux, romantique et unique.`;

    try {
      // Appel à l'API d'IA (exemple : Messie Flash API ou autre)
      const response = await axios.get(`https://messie-flash-api-ia.vercel.app/chat?prompt=${encodeURIComponent(prompt)}&apiKey=messie12356osango2025jinWoo`);
      let result = response.data?.parts?.[0]?.reponse || response.data?.response || "💔 Impossible de générer le poème, réessaie.";

      // Réponse stylisée
      const finalMessage = `💖🌹 『𝑪𝑶𝑼𝑷𝑳𝑬』 🌹💖\n\n` +
        `👫 Pour : ${names[0]} et ${names[1]}\n\n` +
        `${result}\n\n` +
        `💌 Que l'amour soit toujours avec vous !`;

      return message.reply(finalMessage);
    } catch (err) {
      console.error(err);
      return message.reply("⚠️ Une erreur est survenue lors de la génération du poème.");
    }
  }
};