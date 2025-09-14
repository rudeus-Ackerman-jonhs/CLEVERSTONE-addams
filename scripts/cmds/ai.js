const axios = require('axios');

const API_URL = 'https://messie-flash-api-ia.vercel.app/chat?prompt=';
const API_KEY = 'messie12356osango2025jinWoo';

// Fonction pour récupérer la réponse de l’API
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

// Convertir en police serif élégante
function toSerifFont(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const serif   = "𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑕𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁";
    return text.split("").map(ch => {
        const idx = normal.indexOf(ch);
        return idx > -1 ? serif[idx] : ch;
    }).join("");
}

// Mise en forme finale
function formatResponse(content, username) {
    return (
`✦••┈ 🌿『𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶』🌿 ┈••✦

👋 𝑺𝒂𝒍𝒖𝒕 @${username} 🧏

${toSerifFont(content)}`
    );
}

module.exports = {
    config: {
        name: 'ai',
        author: 'rudeus Ackerman',
        version: '3.0',
        role: 0,
        category: 'AI',
        shortDescription: 'IA intelligente',
        longDescription: 'Une IA capable de répondre à diverses questions et demandes.',
        keywords: ['ai']
    },

    onStart: async function({ api, event, args, usersData }) {
        const input = args.join(' ').trim();
        const username = await usersData.getName(event.senderID);

        if (!input) {
            return api.sendMessage(formatResponse("Salut, comment puis-je vous aider ?", username), event.threadID);
        }

        try {
            const res = await getAIResponse(input);
            api.sendMessage(formatResponse(res, username), event.threadID, event.messageID);
        } catch {
            api.sendMessage(formatResponse("Erreur de traitement", username), event.threadID);
        }
    },

    onChat: async function({ event, message, usersData }) {
        const triggers = ['ai'];
        const body = event.body.toLowerCase();
        if (!triggers.some(t => body.startsWith(t))) return;

        const input = body.slice(body.split(' ')[0].length).trim();
        const username = await usersData.getName(event.senderID);

        if (!input) {
            return message.reply(formatResponse("Salut, comment puis-je vous aider ?", username));
        }

        try {
            const res = await getAIResponse(input);
            message.reply(formatResponse(res, username));
        } catch {
            message.reply(formatResponse("Erreur de service", username));
        }
    }
};