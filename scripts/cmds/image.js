module.exports = {
  config: {
    name: "image",
    version: "1.0",
    author: "cleverstone",
    countDown: 15,
    role: 0,
    shortDescription: "Générer une image via IA",
    longDescription: "Crée une image à partir d'une description textuelle (prompt)",
    category: "AI",
    guide: {
      en: "{pn} [description]",
      fr: "{pn} [description]" 
    }
  },

  onStart: async function ({ message, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");

    const prompt = args.join(" ");
    if (!prompt) {
      return message.reply("❌ Veuillez fournir une description pour générer l'image.\nExemple: /image chat mignon");
    }

    const apiUrl = `https://messie-api-image-generator.vercel.app/image?prompt=${encodeURIComponent(prompt)}&apiKey=messieOsangoImage12345`;

    try {
      message.reply("🔄 Génération de l'image en cours...");

      const response = await axios({
        method: "GET",
        url: apiUrl,
        responseType: "arraybuffer",
        timeout: 30000
      });

      if (!response.data) {
        throw new Error("L'API n'a renvoyé aucune donnée.");
      }

      const imgPath = `${__dirname}/tmp/image_gen.png`;
      await fs.outputFile(imgPath, response.data);

      await message.reply({
        body: "✅ Image générée avec succès !",
        attachment: fs.createReadStream(imgPath)
      });

      fs.unlinkSync(imgPath);

    } catch (error) {
      console.error("Erreur dans la commande 'image':", error);
      message.reply("❌ Échec de la génération. Raisons possibles :\n1. Serveur API hors ligne\n2. Description trop complexe\n3. Problème de connexion");
    }
  }
};