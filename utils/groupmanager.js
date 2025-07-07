async function kickUser(sock, groupId, userId) {
  await sock.groupParticipantsUpdate(groupId, [userId], "remove");
}

async function addUser(sock, groupId, userId) {
  await sock.groupParticipantsUpdate(groupId, [userId], "add");
}

module.exports = { kickUser, addUser };
