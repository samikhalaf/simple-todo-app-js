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

function addTodo(e) {
  // With this we prevent the form from submitting nowhere
  e.preventDefault()

  // Create div container for each task
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // Create list and append it
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value

  // Add todo to local storage
  saveLocalTodos(todoInput.value)

  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  // Clear todo input value
  todoInput.value = ''

  // Create Completed Button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = `<i class="fas fa-check"></i>`
  completedButton.classList.add('complete-button')
  todoDiv.appendChild(completedButton)

  // Create trash button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`
  trashButton.classList.add('trash-button')
  todoDiv.appendChild(trashButton)

  // Attach final Todo
  todoList.appendChild(todoDiv)
}

function deleteTodo(e) {
  const item = e.target

  // Check mark button
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
    console.log(todo)
  }

  // Delete todo button
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement
    // todo.classList.add('fall')

    removeLocalTodos(todo)
    todo.addEventListener('transitionend', (e) => {
      todo.remove()
    })
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {
    // Switch structure for selecting what to display
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
