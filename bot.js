const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { state, saveState } = useSingleFileAuthState("./auth.json");
const { tagEveryone } = require("./utils/tagAll");
const { kickUser, addUser } = require("./utils/groupManager");

async function startBot() {
  const sock = makeWASocket({ auth: state, printQRInTerminal: true });

  sock.ev.on("creds.update", saveState);
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    const from = msg.key.remoteJid;

    if (msg.message?.conversation === "!tagall") {
      await tagEveryone(sock, from, "🔥 Everyone, gather up!");
    }
    if (msg.message?.conversation?.startsWith("!kick ")) {
      const userId = msg.message.conversation.split(" ")[1];
      await kickUser(sock, from, userId);
    }
    if (msg.message?.conversation?.startsWith("!add ")) {
      const userId = msg.message.conversation.split(" ")[1];
      await addUser(sock, from, userId);
    }
  });
}

startBot();
