
var mongoose = require("mongoose");

var UserShema = mongoose.Schema({
	username:String,
});

var User = mongoose.model("User", UserShema);
module.exports = User;