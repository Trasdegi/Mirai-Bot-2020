module.exports = (client, command, err) => {
  console.error(`Error encountered on command ${command.name} :\n${err}`);
};