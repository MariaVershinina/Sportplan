var ToDo = require("../models/todo.js"),
ToDosController = {};
ToDosController.index = function (req, res) {
	ToDo.find({}, function (err, toDos) {
		res.json(toDos);
    });
};
ToDosController.create = function (req, res) {
	var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err, result) {
		ToDo.find({}, function (err, result) {
			res.json(result);
	    });
	
	});
};
ToDosController.show = function(req,res){
	var id = req.params.id;
	console.log(req);
	ToDo.find({"_id":id}, function (err, todo) {
		if (err !== null) {
			res.json(err);
		} else {
			if (todo.length > 0) {
			res.json(todo[0]);
		} else {
			res.send("Не найдено");
		}
	}
	});
};
ToDosController.destroy = function(req, res) {
	console.log("Destroy");
	console.log(req.params.id);
	
	ToDo.remove({"_id": req.params.id},function (err, toDos) {
		console.log("Destroy");
		res.json(toDos);
    });
	//ToDo.find({}, function (err, result) {
			//console.log(res.json(result));
	 //  });

	
	//Do the thing to destroy and then res.send 200.

}
module.exports = ToDosController;