// Nura Karkadan
// virginia state university 
// Project 02
 // May 4
const taskInput = document.querySelector("#new_task_input");
taskBox = document.querySelector("#tasks"),
taskAdd = document.querySelector("#new_task_submit"),
task_cat  = document.querySelector(".category_list"),
task_priority   = document.querySelector("#Priority"),
task_description = document.querySelector(".description_task");

let editId,
isEditTask = false,

todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {

                        liTag += `<div class="task">
                                <div class="content">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)"   
                                            type="checkbox" 
                                            id="${id}" ${completed}>

                                    <p class="${completed}">${todo.name}</p>
                                </label>
                                <div class="category">${todo.category}</div>
                                <div class="priority_status">${todo.priority}</div>
                                <div class="desc">${todo.description}</div>
                                </div>
                                <div class="action">
                                    <button onclick='deleteTask(${id}, "${id}")' 
                                            class="Delete">Delete</button>
                                    <button onclick='editTask(${id}, "${filter}")' 
                                            class="Edit">Edit</button>
                                    <button onclick='duplicateTask(${id}, "${filter}")' 
                                            class="Duplicate">Duplicate</button>
                                </div>
                            </div>`;
            }
        });
    }
    taskBox.innerHTML = liTag || 
    `<span style="color:darkred;font-weight:bold"> You Don't Have Any Task To Display. 
     </span>`;
     
}
showTodo("all"); 

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}


function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = todos[taskId].name;
    taskInput.focus();
    task_description.value = todos[taskId].description;
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo('all');
}

function duplicateTask(duplicate_id, filter) {

    let taskInfo = {name: todos[duplicate_id].name, status: todos[duplicate_id].status,category:todos[duplicate_id].category,priority:todos[duplicate_id].priority,description:todos[duplicate_id].description};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);

}


document.getElementById("new_task_submit").addEventListener("click", function(e){
    e.preventDefault();

    if(taskInput.value == ''){
      alert('Please Insert Task title');
      return;
    }
   
    let userTask      = taskInput.value.trim();
    let taskCategory  = task_cat.value.trim();
    let taskPriority  = task_priority.value;
    let taskDescription = task_description.value.trim()

        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending",
            category:taskCategory,priority:taskPriority,description:taskDescription};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
            todos[editId].category = taskCategory;
            todos[editId].priority = taskPriority;
            todos[editId].description = taskDescription;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo('all');

});
