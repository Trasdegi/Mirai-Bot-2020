module.exports = (command, err) => {
  console.error(`Error encountered on command ${command.name} :\n${err}`);
};