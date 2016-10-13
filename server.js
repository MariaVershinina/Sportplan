var express = require("express"),
http = require("http"),
mongoose = require("mongoose"),
//setimmediate = require("setimmediate"),
//ToDo = require("./models/todo.js"),

ToDosController = require("./controllers/todos_controller.js"),
ToDoneController = require("./controllers/todone_controller.js"),
usersController = require("./controllers/users_controller.js"),

app = express(),
bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/amazeriffic');


// начинаем слушать запросы


app.set("strict routing", false);
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.use(bodyParser.urlencoded());
app.get("/trainings.json",ToDosController.index);
app.get("/trainings/:id",ToDosController.show);
app.del("/trainings/:id",ToDosController.destroy);
app.post("/trai", ToDosController.create);

app.get("/trainingsdone.json", ToDoneController.index);
app.post("/traidone", ToDoneController.create);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.del("/users/:username", usersController.destroy);

