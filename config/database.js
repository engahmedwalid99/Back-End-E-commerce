const mongoose = require("mongoose");

const DB_Connected = async () => {
  const DB_URL = process.env.MONGODB_URI;
  await mongoose
    .connect(DB_URL)
    .then((connection) => {
      console.log(`Mongoo DB Connected on port: ${connection.connection.port}`);
    })
    .catch((e) => {
      console.log(`Somthing Wrong ${e}`);
    });
};

module.exports = DB_Connected;
