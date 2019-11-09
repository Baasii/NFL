const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');




function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');  
}

const li = document.createElement('li');

li.className = 'collection-item';
// Create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));


// Create new link element
const link = document.createElement('a');
// Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
// Append the link to li
li.appendChild(link);


taskList.appendChild(li);

//Clear input
taskInput.value = '';

e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
        e.target.parentElement.parentElement.remove();      
        }  
    }
}

function clearTasks() {
    //taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // CLear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

loadEventListeners();


