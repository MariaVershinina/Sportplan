var mongoose = require("mongoose");
var ToDoSchema = mongoose.Schema({
description: String
});

var ToDone = mongoose.model("ToDone", ToDoSchema);
module.exports = ToDone;