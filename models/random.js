const randtoken = require('rand-token').generator();

module.exports.generateRandomId = () => {
  const token = randtoken.generate(10, "23456789abcdefghijkmnopqrstuvwxyz");
  return token
}
