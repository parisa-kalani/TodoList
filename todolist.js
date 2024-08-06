
// let todos = [];

let filterValue = "all";

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn");
const saveEdit = document.querySelector(".edit-btn");
const modalInput = document.querySelector(".modal-input")


todoForm.addEventListener("submit",addNewTodo);
selectFilter.addEventListener("change" , (e)=>{
  filterValue = e.target.value;
  filterTodos();
});
document.addEventListener("DOMContentLoaded",(e)=>{
 const todos = getAllTodos();
 createTodos(todos);
})
closeBtn.addEventListener("click" , closeModal);
backdrop.addEventListener("click" , closeModal);
saveEdit.addEventListener("click" , editTodo);


function addNewTodo(e){
 e.preventDefault();

 const newTodo = {
  id : Date.now(),
  createdAt : new Date().toISOString(),
  title : todoInput.value,
  isCompleted : false,
  
}
saveTodo(newTodo);
filterTodos();
}

function createTodos(todos){
  let result = "";
todos.forEach(todo=> {
  result += ` <li class="todo">
          <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
          <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
          <button class="todo__check" data-todo-id=${todo.id}><i class="far fa-check-square"></i></button>
          <button class="todo__edit" data-todo-id=${todo.id}><i class="fas fa-edit"></i></button>
          <button class="todo__remove" data-todo-id=${todo.id}><i class="far fa-trash-alt"></i></button>
        </li> `
});
todoList.innerHTML = result;
todoInput.value="";

const removeBtns = [...document.querySelectorAll(".todo__remove")];
removeBtns.forEach((btn)=> btn.addEventListener("click",removeTodo));
const checkBtns = [...document.querySelectorAll(".todo__check")];
checkBtns.forEach((btn) => btn.addEventListener("click" , checkTodo));
const editBtns =[...document.querySelectorAll(".todo__edit")];
editBtns.forEach((btn)=>btn.addEventListener("click",showModal));
}




function filterTodos( ){
const todos = getAllTodos();
switch (filterValue) {
  case "all":{
    createTodos(todos);
    break;
  }
  case "completed":{
    const filteredTodos = todos.filter((t) => t.isCompleted);
    createTodos(filteredTodos);
    break;
  }
  case "uncompleted":{
    const filteredTodos = todos.filter((t) => !t.isCompleted);
    createTodos(filteredTodos);
    break;
  }
  default: createTodos(todos);
   
}
}

function removeTodo(e){
 let todos = getAllTodos();
 const todoId = Number(e.target.dataset.todoId);
 todos = todos.filter((t) => t.id !== todoId);
 saveAllTodos(todos);
 filterTodos();
}

function checkTodo (e){
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
 filterTodos();
}



function showModal(e){
 modal.classList.remove("hidden");
 backdrop.classList.remove("hidden");
 const todos = getAllTodos();
 const todoId = Number(e.target.dataset.todoId);
 
 const todo = todos.find((t) => t.id === todoId);
 modalInput.value = todo.title;
 modalInput.id = todoId;

}


function closeModal(){
modal.classList.add("hidden");
backdrop.classList.add("hidden");
}

function editTodo(){
 const todos = getAllTodos();
 console.log(typeof todos[0].id , typeof modalInput.id);
 const todo = todos.find((todo)=> todo.id === Number(modalInput.id));
 console.log(todo);
 todo.title = modalInput.value;
 saveAllTodos(todos);
 filterTodos();
 closeModal();
}

function getAllTodos(){
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
return savedTodos;
}

function saveTodo(todo){
 const savedTodos = getAllTodos();
 savedTodos.push(todo)
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos (todos){
localStorage.setItem("todos",JSON.stringify(todos));
}

