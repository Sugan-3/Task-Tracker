let tasks = [];
let taskIdCounter = 1;

let taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click',() =>{
    const taskDescription = taskInput.value.trim();
    if(taskDescription){
        const taskId = taskIdCounter++;
        tasks.push({id: taskId, description: taskDescription, completed : false});
        taskInput.value='';
        renderTasks();
        
    }
});

function renderTasks() {

    taskList.innerHTML = '';

    const sortedTasks = tasks.slice().sort((a,b) => a.completed - b.completed);

    sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.completed ? 'completed' : ''}`;

        const taskDescription = document.createElement('span');
        taskDescription.className = 'description';
        taskDescription.textContent = task.description;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Unmark' : 'Complete';
        completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        taskItem.appendChild(taskDescription);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); 
    renderTasks();
}

renderTasks();