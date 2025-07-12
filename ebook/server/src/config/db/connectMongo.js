const mongoose = require("mongoose");
const { MONGO_URI } = require("../env");

async function connectMongo() {
  try {
    await mongoose
      .connect(`${MONGO_URI}/${userName}`)
      .then(() => console.info("👖 : MongoDB connected..."));
  } catch (error) {
    console.error(`Error connecting to MongoDB...${error.message}`);
  }
}

module.exports = { connectMongo };
