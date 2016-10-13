var User = require("../models/user.js");
var mongoose = require("mongoose");
var UsersController={};

User.find({}, function (err, result) {
	if (err !== null) {
		console.log("Что-то идет не так");
		console.log(err);
	} else if (result.length === 0) {
		console.log("Создание тестового пользователя...");
		var exampleUser = new User({"username":"semmy"});
		exampleUser.save(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Тестовый пользователь сохранен");
			}		
		});
	}
});





UsersController.index = function (req, res) {
console.log("вызвано действие: индекс");
res.send(200);
};
UsersController.show = function (req, res) {
console.log("вызвано действие: показать");
res.sendFile("./client/index.html");
};

UsersController.create = function (req, res) {
console.log("вызвано действие: создать");
res.send(200);
};

UsersController.update = function (req, res) {
console.log("вызвано действие: обновить");
res.send(200);
};

UsersController.destroy = function (req, res) {
console.log("вызвано действие: удалить");
res.send(200);
};


module.exports = UsersController;