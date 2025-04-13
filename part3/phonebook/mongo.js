const mongoose = require("mongoose");
const { Schema } = mongoose;

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = {
  Person,
};
