module.exports = {
  config: {
    name: "salut",
    aliases: ["hey","hi","hello","bonjour","cc","salut"],
    version: "2.0",
    author: "rudeus",
    countDown: 5,
    role: 0,
    shortDescription: "Répondre aux salutations avec style",
    longDescription: "Répondre avec un message engageant, parfois flatteur, parfois provocant, parfois complimentant",
    category: "reply",
  },
  
  onStart: async function () {},

  onChat: async function({ api, event, message }) {
    const salutation = event.body.trim().toLowerCase();

    const salutationsFr = [
      "Salut toi 😏 ! Alors, comment va cette personne qui rend tout le monde jaloux de sa bonne humeur ?",
      "Hey 😎 ! Tu es encore en forme ou tu te caches dans ton lit ?",
      "Bonjour 🌞 ! Toujours aussi charmant(e) ce matin ?",
      "Coucou 👀 ! Tu vas bien ou tu fais semblant ?",
      "Salut 😁 ! Alors, le/la plus beau/belle du groupe, ça va ?",
      "Hey hey 🎉 ! Tu as survécu à la journée ou pas ?",
      "Salut 😏 ! J’espère que quelqu’un t’a déjà complimenté aujourd’hui… sinon je le fais !",
      "Coucou 👋 ! Alors, tu brilles autant qu’hier ?",
      "Bonjour ✨ ! La star du jour, ça va ?",
      "Hey 🙌 ! Tu es prêt(e) à illuminer notre journée ?",
      "Salut 😎 ! Toujours ce sourire qui fait fondre tout le monde ?",
      "Coucou 😏 ! Alors, prêt(e) à affronter les défis du jour ?",
      "Bonjour 🌸 ! Comment va mon/ma préféré(e) du groupe ?",
      "Hey 😁 ! Tu caches quelque chose de drôle aujourd’hui ?",
      "Salut 👀 ! Tu es au top comme toujours ou tu prends un break ?",
      "Coucou ✨ ! On veut savoir si tu es toujours aussi génial(e) !",
      "Hey 😎 ! Alors, la légende du groupe, ça roule ?",
      "Salut 😁 ! Tu es toujours capable de surprendre les gens ?",
      "Bonjour 😏 ! Une nouvelle aventure aujourd’hui ou juste chill ?",
      "Coucou 👋 ! Comment va la personne qui rend tout plus lumineux ?",
      "Hey hey 🎉 ! Toujours en train de voler la vedette ?",
      "Salut 😎 ! Prêt(e) à partager ton énergie légendaire aujourd’hui ?",
      "Coucou 😁 ! Tu es toujours aussi incroyable ou c’est un jour off ?",
      "Bonjour 🌞 ! Comment va le/la champion(ne) du sourire ?",
      "Hey 😏 ! Tu caches un secret aujourd’hui, pas vrai ?",
      "Salut 🙌 ! Alors, toujours au top de ta forme ?",
      "Coucou 😎 ! Tu vas bien ou je dois te complimenter pour ça ?",
      "Bonjour ✨ ! La personne la plus charmante du groupe, ça va ?",
      "Hey 😁 ! Prêt(e) à briller comme d’habitude ?",
      "Salut 👀 ! Alors, ce look du jour, on applaudit ou on critique ?",
      "Coucou 😏 ! Toujours aussi captivant(e) à regarder ?",
      "Bonjour 🌸 ! Comment se porte notre star préférée ?",
      "Hey 🎉 ! Tu vas bien ou tu as besoin d’un petit compliment pour booster ta journée ?",
      "Salut 😎 ! Encore en train de rendre les autres jaloux de ta bonne humeur ?",
      "Coucou 😁 ! La personne la plus stylée du groupe, ça roule ?",
      "Bonjour ✨ ! Tu es toujours capable d’impressionner tout le monde ?",
      "Hey 😏 ! Alors, prêt(e) à conquérir la journée ?",
      "Salut 👀 ! Tu caches un sourire coquin aujourd’hui ou pas ?",
      "Coucou 😎 ! On veut savoir si tu es toujours aussi génial(e) !",
      "Bonjour 😁 ! Le/la meilleur(e) du groupe, ça va ?",
      "Hey ✨ ! Toujours en train de charmer tout le monde autour de toi ?",
      "Salut 😏 ! Une nouvelle raison de te complimenter aujourd’hui ?",
      "Coucou 👀 ! Comment va le/la phénomène du groupe ?",
      "Bonjour 🌞 ! Toujours capable de rendre tout le monde heureux avec ton énergie ?",
      "Hey 😎 ! Alors, tu es prêt(e) à rendre cette journée mémorable ?"
    ];

    const salutationsEn = [
      "Hello! How are you today?",
      "Hi! Nice to see you.",
      "Hey 👋! Glad to catch you.",
      "Good evening 🌙! How was your day?",
      "Yo 😎! What's up?",
      "Hey 👋! How's it going?",
      "Hello there 📞! Who's calling?",
      "Hi there! Hope you're doing well.",
      "Heeey 🙌! How’s everything?",
      "Hey buddy 😊!",
      "Good morning, happy to see you again.",
      "Hey hey! Still feeling great?",
      "Hi! Ready for a wonderful day?",
      "Hello 🌸! Long time no see.",
      "Good morning ☀️! Have a great day.",
      "Hi 😁! Hope everything’s going fine.",
      "Good evening ✨! Ready to relax?",
      "Hey 👌! What's new since last time?",
      "Hello 🙋! I thought about you today.",
      "Hey 🎉! You made my day brighter."
    ];

    const userName = event.senderName || "toi";
    let randomIndex, replyMessage;

    if (salutation.includes("salut") || salutation.includes("bonjour") || salutation.includes("cc") || salutation.includes("hey") || salutation.includes("hi")) {
      randomIndex = Math.floor(Math.random() * salutationsFr.length);
      replyMessage = salutationsFr[randomIndex];
      api.setMessageReaction("👋", event.messageID, () => {}, true);
    } else if (salutation.includes("hello")) {
      randomIndex = Math.floor(Math.random() * salutationsEn.length);
      replyMessage = salutationsEn[randomIndex];
      api.setMessageReaction("🍁", event.messageID, () => {}, true);
    } else return;

    const marshmelloHeader = `✦••┈ 🌿 『𝑴𝑨𝑹𝑺𝑯𝑴𝑬𝑳𝑳𝑶』 🌿 ┈••✦\n\n👋 Salut @${userName} 🧏\n\n`;

    return message.reply(marshmelloHeader + replyMessage);
  }
};