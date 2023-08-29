let stack = [];
const thingsTodoTag = 
  `<div class="item_box">
      <div class="left-contents">
        <input type="checkbox" class="checkbox1">
        <input type="text" class="input_todo"></input>
      </div>
      <div class="right-contents">
        <div class="edit_icon"><img src="assets/icons/tool.png" alt="edit"></div>
        <div class="delete_icon"><img src="assets\\icons\\x-mark.png" alt="delete"></div>
      </div>
    </div>`;

    //onclick="deleteTodo()
const create_Todo = document.getElementById('create_todo');
create_Todo.addEventListener('click', createTodo);
let delete_Todo = document.getElementsByClassName('.delete_icon');
let edit_Todo = document.getElementsByClassName('.edit_icon');
let complete_Todo = document.getElementsByClassName('checkbox1');

function createTodo(){
  const containerTag = document.getElementById('main-container');
  containerTag.insertAdjacentHTML('beforeend', thingsTodoTag);
  delete_Todo = document.getElementsByClassName('delete_icon');
  for(let i = 0; i < delete_Todo.length; i++) {
    delete_Todo[i].addEventListener('click', deleteTodo);
  }
  edit_Todo = document.getElementsByClassName('edit_icon');
  for(let i = 0; i < edit_Todo.length; i++) {
    edit_Todo[i].addEventListener('click', editTodo);
  }
  complete_Todo = document.getElementsByClassName('checkbox1');
  for(let i = 0; i < edit_Todo.length; i++) {
    complete_Todo[i].addEventListener('click', completeTodo);
  }
};

function editTodo(e){
  const inputBox = e.target.parentNode.parentNode.parentNode.querySelector('.input_todo');
  inputBox.focus();
};

function deleteTodo(e){
  itemBoxToDelete = e.target.parentNode.parentNode.parentNode; 
  itemBoxToDelete.remove();
};

function completeTodo(e){
  const inputBox = e.target.parentNode.querySelector('.input_todo');
  if(e.target.checked)
    inputBox.style.textDecoration = 'line-through';
  else
    inputBox.style.textDecoration = 'none';
};

function loadAndInsertHTML() {
  const savedHTML = localStorage.getItem('savedHTML');
  if (savedHTML) {
      let contentDiv = document.getElementById('content');
      // contentDiv가 null이라면 새로운 div를 생성하고 body에 추가
      if (!contentDiv) {
          contentDiv = document.createElement('div');
          contentDiv.id = 'content';
          document.body.appendChild(contentDiv);
      }
      contentDiv.innerHTML = savedHTML;
  }
}
