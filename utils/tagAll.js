async function tagEveryone(sock, groupId, text) {
  const metadata = await sock.groupMetadata(groupId);
  const mentions = metadata.participants.map(p => p.id);
  await sock.sendMessage(groupId, { text, mentions });
}

module.exports = { tagEveryone };
