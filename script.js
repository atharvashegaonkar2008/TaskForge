let currentFilter = "all";
function showAllTasks(){
    currentFilter = "all";
    renderTasks();
}

function showCompletedTasks(){
    currentFilter = "completed";
    renderTasks();
}

function showPendingTasks(){
    currentFilter = "pending";
    renderTasks();
}

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [
    {
        title: "Design Landing Page",
        assignedTo: "Atharv",
        dueDate: "20 June 2026",
        priority: "High",
        completed: false
    },
    {
        title: "Setup Database",
        assignedTo: "Team Member",
        dueDate: "25 June 2026",
        priority: "Medium",
        completed: false
    },
    {
        title: "Mentor Review Meeting",
        assignedTo: "Mentor",
        dueDate: "28 June 2026",
        priority: "High",
        completed: false
    },
    {
        title: "Deploy Frontend",
        assignedTo: "Atharv",
        dueDate: "30 June 2026",
        priority: "Low",
        completed: false
    }
];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Signup form validation with js 
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validation
        if (fullName.length < 3) {
            alert('Full name must be at least 3 characters');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        alert('Account created successfully!');
        signupForm.reset();
    });
}
function welcome(){
    alert("Welcome to TaskForge");
}

function changeTitle(){
    const title=document.getElementById("title");

    title.textContent="Welcome Atharv";
}

function changeColor(){
    const title=document.getElementById("title");

    title.style.color="red";
}

function markComplete(index){
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function showTaskMessage(){
    alert("New Task feature coming soon!");
}

function addTask(){

    const taskName = prompt("Enter Task Name");
    const priority = prompt(
    "Enter Priority (High, Medium, Low)"
    );

    if(taskName === null || taskName.trim() === ""){
        return;
    }

    tasks.push({
    title: taskName,
    assignedTo: "Atharv",
    dueDate: "Not Set",
    priority: priority || "Medium",
    completed: false
    });

    saveTasks();
    renderTasks();
}

function updateStats(){

    let completed = 0;

    for(let i = 0; i < tasks.length; i++){

        if(tasks[i].completed){
            completed++;
        }
    }

    const pending = tasks.length - completed;

    document.getElementById("total-tasks")
        .textContent = tasks.length;

    document.getElementById("completed-tasks")
        .textContent = completed;

    document.getElementById("pending-tasks")
        .textContent = pending;
}

function editTask(index){

    const newTitle = prompt(
        "Enter new task name",
        tasks[index].title
    );

    if(
        newTitle === null || newTitle.trim() === ""
    ){
        return;
    }

    tasks[index].title =
        newTitle.trim();

    saveTasks();

    renderTasks();
}

function renderTasks(){

    const container =
        document.getElementById("tasks-container");

    container.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){

        const task = tasks[i];

        if(
            currentFilter === "completed" &&
            !task.completed
        ){
            continue;
        }

        if(
            currentFilter === "pending" &&
            task.completed
        ){
            continue;
        }

        const taskCard =
            document.createElement("div");

        taskCard.classList.add("task-card");

        const buttonText =
            task.completed
            ? "Completed"
            : "Mark Complete";

        let priorityColor = "";

        if(task.priority === "High"){
            priorityColor = "red";
        }
        else if(task.priority === "Medium"){
            priorityColor = "orange";
        }
        else{
            priorityColor = "green";
        }

        taskCard.innerHTML = `
            <h3>${task.title}</h3>

            <p>Assigned To: ${task.assignedTo}</p>

            <p>Due Date: ${task.dueDate}</p>

            <p> Priority:
                <span style="color:${priorityColor}; font-weight:bold;">
                    ${task.priority}
                </span>
            </p>

            <button onclick="markComplete(${i})">
                ${buttonText}
            </button>

            <button onclick="editTask(${i})">
                Edit
            </button>

            <button onclick="deleteTask(${i})">
                Delete
            </button>
        `;

        container.appendChild(taskCard);
        
    }
    updateStats();
}
renderTasks();


