const { default: mongoose } = require("mongoose");

const sprintSchema = mongoose.Schema({
  title: String,
  description: String,
  userID: String,
});

const sprintModel = mongoose.model("sprint", sprintSchema);

module.exports = { sprintModel };
