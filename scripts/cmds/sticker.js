module.exports = {
  config: {
    name: "sticker",
    aliases: ["stick", "stkr"],
    version: "2.0",
    author: "rudeus",
    countDown: 5,
    role: 0,
    shortDescription: "Répond aux stickers avec un clash drôle",
    longDescription: "Si quelqu'un envoie un sticker, le bot répond avec une remarque sarcastique ou un clash humoristique",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function({ api, event, message }) {
    if (!event.stickerID) return;

    const userName = event.senderName || "toi";

    const clashReplies = [
      "Oh 😏 @"+userName+", encore un sticker ? Tu fais ça pour impressionner qui ?",
      "Mouais... sympa ton sticker @"+userName+", mais t’as autre chose à dire ?",
      "Wow 😆 @"+userName+", ton sticker parle mieux que toi aujourd'hui, hein ?",
      "Encore un sticker @"+userName+" ? Tu deviens prévisible là !",
      "Haha @"+userName+", ton sticker est presque aussi original que tes messages...",
      "Hmm 🤔 @"+userName+", tu crois vraiment qu’un sticker va nous convaincre ?",
      "Oh @"+userName+", le sticker est là… et le texte ? Toujours silencieux !",
      "Encore un @"+userName+" ? Tu collectionnes les stickers maintenant ?",
      "Waouh 😎 @"+userName+", je vois que tu t’exprimes bien avec tes autocollants...",
      "Ahah @"+userName+", tu crois que ce sticker va régler tout ?",
      "Encore un ? @"+userName+", tu fais ça juste pour me tester ?",
      "Oh non 🙄 @"+userName+", pas encore un sticker !",
      "Tu sais, @"+userName+", parler serait plus efficace qu’un sticker...",
      "Encore un sticker, @"+userName+"… Tu veux battre un record ?",
      "Mdr @"+userName+", ton sticker est mignon mais il ne dit rien 😅",
      "Tu joues avec les stickers maintenant, @"+userName+" ?",
      "Oh @"+userName+", ça devient répétitif… Change de stratégie !",
      "Encore un autocollant ? Sérieusement @"+userName+" ?",
      "Haha @"+userName+", ton sticker a plus de caractère que toi !",
      "Tu crois que ce sticker va me faire peur @"+userName+" ? 😏",
      "Mdr @"+userName+", toujours à court de mots hein ?",
      "Oh @"+userName+", t’es coincé dans le mode sticker ?",
      "Encore toi avec tes stickers @"+userName+" ? 😆",
      "Hmm @"+userName+", je pense que tes stickers veulent parler pour toi…",
      "Encore un autocollant @"+userName+", vraiment ? 😅",
      "Oh @"+userName+", ton sticker est mignon mais il manque de punch !",
      "Encore un sticker ? Tu veux qu’on organise un défilé @"+userName+" ?",
      "Mdr @"+userName+", tu devrais écrire un roman à la place…",
      "Encore un sticker @"+userName+", t’es obsédé 😏",
      "Oh @"+userName+", tu veux me défier avec des stickers ?",
      "Haha @"+userName+", tes stickers ont plus d’humour que toi !",
      "Encore un ? @"+userName+", ça commence à devenir épique 😂",
      "Oh non @"+userName+", t’es toujours en mode sticker !",
      "Mdr @"+userName+", ton autocollant a une meilleure carrière que toi 😆",
      "Encore un sticker @"+userName+", j’attends ton texte maintenant !",
      "Oh @"+userName+", je savais pas que tu collectionnais les stickers…",
      "Encore toi ? @"+userName+", tu me testes ou quoi ?",
      "Haha @"+userName+", ton sticker est sympa mais trop bavard 😏",
      "Encore un autocollant @"+userName+", ça devient artistique 😂",
      "Oh @"+userName+", ton sticker veut parler à ma place ?",
      "Mdr @"+userName+", sérieusement, t’as rien à dire à côté de ce sticker ?",
      "Encore un ? @"+userName+", tu vas finir par m’impressionner 😎",
      "Oh @"+userName+", sticker envoyé, cerveau en pause ?",
      "Haha @"+userName+", c’est ton jour sticker aujourd’hui 😅",
      "Encore un sticker @"+userName+", je commence à les compter…",
      "Oh @"+userName+", tu crois vraiment que ce sticker va changer quelque chose ?",
      "Mdr @"+userName+", ton autocollant a plus de charisme que toi !",
      "Encore un @"+userName+", je note ça dans ton palmarès 😏",
      "Oh @"+userName+", tu continues de spammer les stickers… courage !"
    ];

    const randomIndex = Math.floor(Math.random() * clashReplies.length);
    const replyMessage = clashReplies[randomIndex];

    const marshmelloHeader = `✦••┈ 🌿 『𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶』 🌿 ┈••✦\n\n`;

    await message.reply(marshmelloHeader + replyMessage);
  }
};