const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  const user = users.find(user => user.username === username)

  if(!user) return response.status(404).json({error: 'User does not exist!'})

  request.user = user

  return next()
}

app.post('/users', (request, response) => {
  // Complete aqui
  try{
    const {name , username} = request.body
    const user ={
      name, 
      username,
      id: uuidv4(),
      todos: []
    }

    const userAlreadyExists = users.some(x => x.username === username)
    if(userAlreadyExists){
      throw new Error("User Already Exists")
    }
    
    users.push(user)  

    return response.status(201).json(user)
  }catch(error){
    return response.status(400).json({error : error.message})
  }

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  console.log(user.todos, "the todos from the user")
  return response.json(user.todos)
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  const { title, deadline } = request.body

  const newTodo = {
      id: uuidv4(),
      title,
      done: false,
      deadline,
      created_at: new Date()
    }

    user.todos.push(newTodo)

    return response.status(201).json(newTodo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;