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
let todoKeyList = [];
let keyNum = 0;

const arrayRemove = (arr, value) => {
  return arr.filter((ele) => {
      return ele != value;
  });
};

window.onload = loadAndInsertHTML(todoKeyList);

function createTodo(){
  const containerTag = document.getElementById('main-container');
  containerTag.insertAdjacentHTML('beforeend', thingsTodoTag);

  let tempObj = createJson(false, null, null);
  localStorage.setItem(tempObj.key_id, JSON.stringify(tempObj));
  containerTag.lastElementChild.id = tempObj.key_id;

  delete_Todo = containerTag.lastElementChild.querySelector('.delete_icon');
  delete_Todo.addEventListener('click', deleteTodo);
  
  edit_Todo = containerTag.lastElementChild.querySelector('.edit_icon'); 
  edit_Todo.addEventListener('click', editTodo);

  complete_Todo = containerTag.lastElementChild.querySelector('.checkbox1');
  complete_Todo.addEventListener('click', completeTodo);

  focusOut_Todo = containerTag.lastElementChild.querySelector('.input_todo');
  focusOut_Todo.addEventListener('change', textFocusOut);
};

function editTodo(e){
  const inputBox = e.target.parentNode.parentNode.parentNode.querySelector('.input_todo');
  inputBox.focus();
};

function deleteTodo(e){
  itemBoxToDelete = e.target.parentNode.parentNode.parentNode;
  localStorage.removeItem(itemBoxToDelete.id);
  todoKeyList = arrayRemove(todoKeyList, itemBoxToDelete.id);
  itemBoxToDelete.remove();
};

function completeTodo(e){
  const inputBox = e.target.parentNode.querySelector('.input_todo');
  if(e.target.checked)
    {inputBox.style.textDecoration = 'line-through';
    //console.log(e.target.parentNode.parentNode.parentNode.outerHTML);
}
  else
    inputBox.style.textDecoration = 'none';
};

function textFocusOut(e){
  let obj = localStorage.getItem(e.target.parentNode.parentNode.id);
  let parsed_obj = JSON.parse(obj);
  parsed_obj.textValue = e.target.value;
  obj = JSON.stringify(parsed_obj);
  localStorage.setItem(e.target.parentNode.parentNode.id, obj);
};

function loadAndInsertHTML() {
  if(!!localStorage.length){
  for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    const unparsed_item = localStorage.getItem(key);
    let parsed_item = JSON.parse(unparsed_item);
    
    const containerTag = document.getElementById('main-container');
    containerTag.insertAdjacentHTML('beforeend', thingsTodoTag);

    const lastElementChild = containerTag.lastElementChild;
    lastElementChild.id = parsed_item.key_id;
    lastElementChild.querySelector('.checkbox1').checked = parsed_item.checkboxChecked;
    lastElementChild.querySelector('.input_todo').value = parsed_item.textValue;
    lastElementChild.querySelector('.input_todo').style.textDecoration = parsed_item.textDecoration;
    obj_delete_Todo = lastElementChild.querySelector('.delete_icon');
    obj_delete_Todo.addEventListener('click', deleteTodo);
    obj_edit_Todo = lastElementChild.querySelector('.edit_icon');
    obj_edit_Todo.addEventListener('click', editTodo);
    obj_complete_Todo = lastElementChild.querySelector('.checkbox1');
    obj_complete_Todo.addEventListener('click', completeTodo);
    obj_focusOut_Todo = lastElementChild.querySelector('.input_todo');
    obj_focusOut_Todo.addEventListener('change', textFocusOut);
    }
  };
};

function updateLocalStorage(){

};

function createJson(checkboxTF, textboxValue, textDecor){
  key = generateKey();
  keyNum += 1;
  todoKeyList.push(key);
  return {'key_id' : key,
          'checkboxChecked' : checkboxTF,
          'textDecoration' : textDecor,
          'textValue' : textboxValue
  };
};

function generateKey(){
  let numb = Math.floor(Math.random() * 1000000);
  return 'todoObj' + numb.toString();
}

