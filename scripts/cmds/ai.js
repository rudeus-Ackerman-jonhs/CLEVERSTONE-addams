const axios = require('axios');
const { getPrefix } = global.utils;

const API_URL = 'https://messie-flash-api-ia.vercel.app/chat?prompt=';
const API_KEY = 'messie12356osango2025jinWoo';

async function getAIResponse(input) {
    try {
        const response = await axios.get(`${API_URL}${encodeURIComponent(input)}&apiKey=${API_KEY}`, {
            timeout: 10000,
            headers: { 'Accept': 'application/json' }
        });

        if (response.data?.parts?.[0]?.reponse) return response.data.parts[0].reponse;
        if (response.data?.response) return response.data.response;
        return "Désolé, je n'ai pas compris la réponse de l'API.";
    } catch (error) {
        console.error("API Error:", error.response?.status, error.message);
        return "Erreur de connexion au serveur IA.";
    }
}

function formatMarshmelloResponse(username, content) {
    // On peut ajouter des paragraphes et espacer le texte pour plus de clarté
    return `✦••┈ 🌿 『𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶』 🌿 ┈••✦\n\n` +
           `👋 Salut @${username} 🧏\n\n` +
           content.split('\n').map(line => line.trim()).join('\n\n') + `\n\n` +
           `💡 Si tu veux plus de détails sur un aspect précis, demande-moi !`;
}

module.exports = {
    config: {
        name: 'ai',
        author: 'rudeus Ackerman',
        version: '3.0',
        role: 0,
        category: 'AI',
        shortDescription: 'IA intelligente',
        longDescription: 'Une IA capable de répondre à diverses questions et demandes avec clarté et détails.',
        keywords: ['ai', 'intelligence', 'chat']
    },
    onStart: async function({ api, event, args, usersData }) {
        const input = args.join(' ').trim();
        const username = await usersData.getName(event.senderID);

        if (!input) {
            return api.sendMessage(formatMarshmelloResponse(username, "Salut ! Comment puis-je t'aider aujourd'hui ?"), event.threadID);
        }

        try {
            const res = await getAIResponse(input);
            api.sendMessage(formatMarshmelloResponse(username, res), event.threadID, event.messageID);
        } catch (err) {
            api.sendMessage(formatMarshmelloResponse(username, "Erreur lors du traitement de ta demande."), event.threadID);
        }
    },
    onChat: async function({ event, message, usersData }) {
        const triggers = ['ai'];
        const body = event.body.toLowerCase();
        if (!triggers.some(t => body.startsWith(t))) return;

        const input = body.slice(body.split(' ')[0].length).trim();
        const username = await usersData.getName(event.senderID);

        if (!input) return message.reply(formatMarshmelloResponse(username, "Salut ! Comment puis-je t'aider aujourd'hui ?"));

        try {
            const res = await getAIResponse(input);
            message.reply(formatMarshmelloResponse(username, res));
        } catch {
            message.reply(formatMarshmelloResponse(username, "Erreur lors du traitement de ta demande."));
        }
    }
};