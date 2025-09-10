const axios = require('axios');

const API_URL = 'https://messie-flash-api-ia.vercel.app/chat?prompt=';
const API_KEY = 'messie12356osango2025jinWoo';

// Fonction pour récupérer la réponse IA
async function getAIResponse(input) {
    try {
        const response = await axios.get(`${API_URL}${encodeURIComponent(input)}&apiKey=${API_KEY}`, {
            timeout: 10000,
            headers: { 'Accept': 'application/json' }
        });

        if (response.data?.parts?.[0]?.reponse) return response.data.parts[0].reponse;
        if (response.data?.response) return response.data.response;
        return "Désolé, réponse non reconnue de l'API";
    } catch (error) {
        console.error("API Error:", error.response?.status, error.message);
        return "Erreur de connexion au serveur IA";
    }
}

// Formatage simple avec pub en bas
function formatResponse(content) {
    return `🌿 𝐌𝐀𝐑𝐒𝐇𝐌𝐄𝐋𝐋𝐎 🌿\n\n${content}\n\n🌱 Rudeus Ackerman 🌱\n╭───────────╮\n | Utilises la commande \n |         🍁Arielgc🍁\n | Pour rejoindre mon\n | Groupe des ia 🖐️🙂🤚\n╰───────────╯`;
}

module.exports = {
    config: {
        name: 'ai',
        author: 'Rudeus Ackerman',
        version: '3.0',
        role: 0,
        category: 'AI',
        shortDescription: 'IA intelligente',
        longDescription: 'Une IA capable de répondre à diverses questions et demandes, même via reply.',
        keywords: ['ai']
    },

    onStart: async function({ api, event, args }) {
        const input = args.length ? args.join(' ').trim() 
                                  : (event.messageReply ? event.messageReply.body : '');
        if (!input) return api.sendMessage(formatResponse("Salut, comment puis-je vous aider ?"), event.threadID);

        try {
            const res = await getAIResponse(input);
            api.sendMessage(formatResponse(res), event.threadID, event.messageID);
        } catch {
            api.sendMessage(formatResponse("Erreur de traitement"), event.threadID);
        }
    },

    onChat: async function({ event, api }) {
        let args = [];

        // Si le message commence par "ai"
        if (event.body && event.body.toLowerCase().startsWith('ai')) {
            args = event.body.split(' ').slice(1);
        }
        // Si c'est un reply au bot
        else if (event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) {
            args = []; // on prend le message du reply comme contexte
        } else return; // pas de trigger, on sort

        await this.onStart({ api, event, args });
    }
};