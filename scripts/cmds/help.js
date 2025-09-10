const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "3.1",
    author: "rudeus ackerman",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands" },
    longDescription: { en: "View command usage and list all commands with detailed info" },
    category: "info",
    guide: { en: "{pn} [empty | <command name>]" },
    priority: 1
  },

  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    // 📌 Liste complète
    if (args.length === 0) {
      const commandsArray = Array.from(commands.values())
        .filter(cmd => cmd.config.role <= role);

      // Grouper par catégories
      const grouped = {};
      for (const cmd of commandsArray) {
        const category = cmd.config.category?.toUpperCase() || "AUTRES";
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(cmd.config.name);
      }

      let msg = `『🌱𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶🌱』\n── 𝐇𝐄𝐋𝐏 𝐋𝐈𝐒𝐓 ──\n\n`;

      // Parcours des catégories
      const categories = Object.entries(grouped);
      categories.forEach(([category, cmds]) => {
        msg += `╭── 🍁${category}🍁 ──╮\n`;
        for (const c of cmds.sort()) {
          msg += `│➟ ${c} 🌿\n`;
        }
        msg += `╰────────────╯\n\n`;
      });

      msg += `📌 Le bot détient actuellement ${commandsArray.length} commandes disponibles.\n`;
      msg += `💡 Créateur : rudeus ackerman 🌟`;

      await message.reply(msg);
      return;
    }

    // 📌 Infos sur une commande spécifique
    const commandName = args[0].toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command) {
      await message.reply(`⚠️ CMD "『${commandName}』" n'existe pas`);
      return;
    }

    const cfg = command.config;
    const roleText = roleTextToString(cfg.role);
    const longDescription = cfg.longDescription?.en || "Aucune description";
    const guideBody = cfg.guide?.en || "Pas de guide disponible";
    const usage = guideBody.replace(/{pn}/g, prefix + cfg.name);

    let response = `『🌱𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶🌱』\n── 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 ──\n\n`;
    response += `╭─── 🍁 ${cfg.name} 🍁 ───╮\n`;
    response += `│ 🌿 Description : ${longDescription}\n`;
    response += `│ 🌿 Alias : ${cfg.aliases ? cfg.aliases.join(", ") : "Aucun"}\n`;
    response += `│ 🌿 Rôle : ${roleText}\n`;
    response += `│ ⏱️ Cooldown : ${cfg.countDown || 1}s\n`;
    response += `│ 🌿 Auteur : ${cfg.author || "Unknown"}\n`;
    response += `╰────────────────────╯\n\n`;
    response += `💡 Usage : ${usage}\n\n`;
    response += `👨‍💻 Créateur : rudeus ackerman\n`;

    await message.reply(response);
  }
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0: return "Tous les utilisateurs";
    case 1: return "Administrateurs de groupe";
    case 2: return "Admin du bot";
    default: return "Rôle inconnu";
  }
}