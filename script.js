let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [
    {
        title: "Design Landing Page",
        assignedTo: "Atharv",
        dueDate: "20 June 2026",
        priority: "High"
    },
    {
        title: "Setup Database",
        assignedTo: "Team Member",
        dueDate: "25 June 2026",
        priority: "Medium"
    },
    {
        title: "Mentor Review Meeting",
        assignedTo: "Mentor",
        dueDate: "28 June 2026",
        priority: "High"
    },
    {
        title: "Deploy Frontend",
        assignedTo: "Atharv",
        dueDate: "30 June 2026",
        priority: "Low"
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

function markComplete(button){
    button.textContent = "Completed";
    button.style.backgroundColor = "green";
    button.disabled = true;
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

    if(taskName === null || taskName.trim() === ""){
        return;
    }

    tasks.push({
        title: taskName,
        assignedTo: "Atharv",
        dueDate: "Not Set",
        priority: "Medium"
    });

    saveTasks();
    renderTasks();
}


function renderTasks(){

    const container =
        document.getElementById("tasks-container");

    container.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){

        const task = tasks[i];

        const taskCard =
            document.createElement("div");

        taskCard.classList.add("task-card");

        taskCard.innerHTML = `
            <h3>${task.title}</h3>

            <p>Assigned To: ${task.assignedTo}</p>

            <p>Due Date: ${task.dueDate}</p>

            <p>Priority: ${task.priority}</p>

            <button onclick="markComplete(this)">
                Mark Complete
            </button>

            <button onclick="deleteTask(${i})">
                Delete
            </button>
        `;

        container.appendChild(taskCard);
    }
}

renderTasks();