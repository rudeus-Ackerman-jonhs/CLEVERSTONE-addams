module.exports = {
    config: {
        name: "spam",
        version: "1.0",
        author: "Rudeus",
        countDown: 5,
        role: 0,
        description: {
            en: "Repeat a message multiple times in a single message"
        },
        category: "fun",
        guide: {
            en: "{pn} <message> | optionally add <number> to repeat"
        }
    },

    onStart: async function({ api, event, args }) {
        if (!args[0]) return api.sendMessage("Please provide a message to spam.", event.threadID);

        // Vérifie si l'utilisateur a mis un nombre à la fin
        let repeat = 500; // par défaut
        const lastArg = args[args.length - 1];
        if (!isNaN(lastArg)) {
            repeat = Math.min(parseInt(lastArg), 500); // limite à 500 max
            args.pop();
        }

        const msg = args.join(" ");
        const fullMessage = Array(repeat).fill(msg).join("\n"); // répète le message 500x, séparé par un saut de ligne

        await api.sendMessage(fullMessage, event.threadID);
    }
};