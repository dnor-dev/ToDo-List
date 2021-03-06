const addForm = document.querySelector(".add");
var list = document.getElementById("list-items");
const search = document.querySelector("#search-todo");


//

function GenerateTemplate(){}

let id = 0;
 GenerateTemplate.prototype.generateTemplate = (todo)=>{
  let html = `<li class="item">${todo}<i id="${id}" class="fa fa-trash delete"></i></li>`;
  list.innerHTML += html;
  id++;
}

class Store{
  static getTodo(){
    let todos;
    if (localStorage.getItem('todos') === null){
      todos = []
    }else{
      todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos;
  }

   static addTodo(todo){
      const todos = Store.getTodo();
      if (todo === ''){

      }
      else if(todo.length>30){

      }else{
        todos.push(todo); 
      }
      localStorage.setItem('todos', JSON.stringify(todos));


    }

  static displayTodo(){
     let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(function(todo){
      const add = new GenerateTemplate();
        add.generateTemplate(todo);
     })
  } 
  
  static deleteTodo(index){
    const  todos = JSON.parse(localStorage.getItem('todos'));

    todos.splice(index, 1);
   
    localStorage.setItem('todos' , JSON.stringify(todos));

  }


}



document.getElementById("button").addEventListener("click", function (e) {
  const todo = addForm.add.value.trim().toLowerCase();
  
  if (todo.length && todo.length <= 30) {
    const add = new GenerateTemplate();
    add.generateTemplate(todo);
    addForm.reset();

    
  } else if (todo === "") {
    alert("Please input a todo!");
  } else {
    alert("ToDo should not be more than 30 words!");
    addForm.reset();
  }

  Store.addTodo(todo.trim());  

  e.preventDefault();
});




// Delete ToDos
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }

  Store.deleteTodo(e.target.id);
  id--;
});

document.addEventListener('DOMContentLoaded' , Store.displayTodo);

var username = localStorage.getItem('username')? localStorage.getItem('username'): "anonymous";

var now = new Date();
document.getElementById('greeting').textContent = now.getHours()< 12 ?`Goodmorning ${username}, what do you plan on doing today?`: now.getHours()>= 12 && now.getHours()<17 ? `Goodafternoon ${username}, what do you plan on doing today?`:`Goodevening ${username}, what do you plan on doing tonight?`;



function updateUsername() { 
  var doc = prompt("Please enter some text");
  localStorage.setItem('username', doc);
  window.location.href = "index.html";
}

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", function () {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});