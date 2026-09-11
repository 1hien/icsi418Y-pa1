const form = document.querySelector("#task-form"); 
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");

const tasks = []; /* this array will hold the tasks */

form.addEventListener("submit", function(event) { /* this function handles the form submission */
    event.preventDefault();

    const name = taskInput.value.trim();
    const priority = priorityInput.value;

    if (name === "") {
        alert("Task name cannot be empty.");
        return;
    }

    const task = {
        name: name,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    displayTasks();
});

function displayTasks() { /* this function displays the list of tasks */
    taskList.innerHTML = "";

    tasks.forEach((task, index) => { 
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        
        taskElement.classList.add(task.priority); /* add the priority class to the task element */

        if (task.completed) { /* if the task is completed, add the "completed" class to the task element */
            taskElement.classList.add("completed");
        }

        const text = document.createElement("span");
        text.textContent = `${task.name} (${task.priority})`;

        const buttons = document.createElement("div");
        buttons.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            displayTasks();
        });

        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);

        taskElement.appendChild(text);
        taskElement.appendChild(buttons);

        taskList.appendChild(taskElement);
    });
}
