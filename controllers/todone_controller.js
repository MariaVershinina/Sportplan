var ToDone = require("../models/todone.js"),
ToDoneController = {};
ToDoneController.index = function (req, res) {
	ToDone.find({}, function (err, toDos) {
		res.json(toDos);
    });
};

ToDoneController.create = function (req, res) {
	var newToDone = new ToDone({"description":req.body.description});
    newToDone.save(function (err, result) {
		ToDone.find({}, function (err, result) {
			res.json(result);
	    });
	
	});
};
module.exports = ToDoneController;