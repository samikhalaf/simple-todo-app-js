// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(event) {
  // With this we prevent the form from submitting nowhere
  event.preventDefault()

  // Create div container for each task
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // Create list and append it
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value

  // Add todo to local storage
  saveLocalTodos(todoInput.value)

  newTodo.classList.add('todo-item')
  todoDiv.append(newTodo)

  // Clear todo input value
  todoInput.value = ''

  //  Create completed button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-button')
  todoDiv.appendChild(completedButton)

  // Trash button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-button')
  todoDiv.appendChild(trashButton)

  // Append to list
  todoList.appendChild(todoDiv)
}

function deleteCheck(event) {
  const item = event.target

  // Check mark
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }

  // Delete todo
  if (item.classList[0] === 'trash-button') {
    // e.target.parentElement.remove();
    const todo = item.parentElement
    todo.classList.add('fall')

    removeLocalTodos(todo)
    todo.addEventListener('transitionend', (e) => {
      todo.remove()
    })
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
    }
  })
}

function saveLocalTodos(todo) {
  // Checking if there are things already saved
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function saveLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}
function removeLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create list
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    todoInput.value = ''
    //Create Completed Button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = `<i class="fas fa-check"></i>`
    completedButton.classList.add('complete-button')
    todoDiv.appendChild(completedButton)
    //Create trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`
    trashButton.classList.add('trash-button')
    todoDiv.appendChild(trashButton)
    //attach final Todo
    todoList.appendChild(todoDiv)
  })
}
