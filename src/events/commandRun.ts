module.exports = (client, command, _, message) => {
  console.log(`La commande ${command.name} a été lancée par ${message.author.id}: ${message.author.username}.`);
};