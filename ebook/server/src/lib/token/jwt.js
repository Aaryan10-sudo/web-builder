const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/env");

async function createjwtToken(id, expiresIn) {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn });
}

async function verifyjwtToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { createjwtToken, verifyjwtToken };
