const addForm = document.querySelector(".add");
var list = document.getElementById("list-items");
const search = document.querySelector("#search-todo");

//

function GenerateTemplate(){}


 GenerateTemplate.prototype.generateTemplate = (todo)=>{
  let html = `<li class="item">${todo}<i class="fa fa-trash delete"></i></li>`;
  list.innerHTML += html;
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
  
  static deleteTodo(item){
    const  todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(function(todo, index){
      if (item.parentElement.classList.contains('item')){
        todos.splice(1 , index);
      }
    })
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

  Store.deleteTodo(e.target);
});

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

document.addEventListener('DOMContentLoaded' , Store.displayTodo);



var now = new Date();
document.getElementById('greeting').textContent = now.getHours()< 12 ?`Goodmorning David, what do you plan on doing today?`: now.getHours()>= 12 && now.getHours()<17 ? `Goodafternoon David, what do you plan on doing today?`:`Goodevening David, what do you plan on doing tonight?`;