const mongoose = require("mongoose");
const { Schema } = mongoose;

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: String,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = {
  Person,
};
