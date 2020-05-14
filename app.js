const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Build a Front End',
  },
  {
    id: 3,
    todo: '???',
  },
  {
    id: 4,
    todo: 'Profit!',
  },
];

// GET /api/todos
app.get("/api/todos", (req, res) => res.json(todoList));

// GET /api/todos/:id
app.get("/api/todos/:id", (req, res) => {
  const todo = todoList.find((todo) => {
    return todo.id === Number.parseInt(req.params.id);
  }) || {};
  const status = Object.keys(todo).length ? 200 : 404;
  res.status(status).json(todo);
};


// POST /api/todos
app.post("/api/todos", (req, res) => {
  if (req.body.todo) {
    const maxId = todoList.reduce((max, currentTodo) => {
      if (currentTodo.id > max) {
        max = currentTodo.id;
      }
    }, 0);

    res.json(req.body);
    const newTodo = {
      id: maxId + 1,
      todo: req.body.todo,
    }
    todoList.push(newTodo);
    res.json(newTodo);
  } else {
    res.status(400).json({
      error: "Please provide something to do",
    });
  }
});

// PUT /api/todos/:id
app.put("/api/todos/:id", (req, res) => {
  if (req.body.todo) {
    const todo = todoList.find((todo) => {
      return todo.id === Number.parseInt(req.params.id);
    }) || {};
    const status = Object.keys(todo).length ? 200 : 404;
    res.status(status).json(todo);

    res.json(req.body);
    const newTodo = {
      id: maxId + 1,
      todo: req.body.todo,
    }
    todoList.push(newTodo);
    res.json(newTodo);
  } else {
    res.status(400).json({
      error: "Please provide something to do",
    });
  }
});



// DELETE /api/todos/:id
app.delete("/api/todos/:id", (req, res) => res.send());


app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
