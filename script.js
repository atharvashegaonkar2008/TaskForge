const currentUser =
    localStorage.getItem(
        "loggedInUser"
    );

const currentPage =
    window.location.pathname;

if(
    !currentUser &&
    (
        currentPage.includes("dashboard.html") ||
        currentPage.includes("tasks.html") ||
        currentPage.includes("projects.html") ||
        currentPage.includes("mentors.html") ||
        currentPage.includes("files.html")
    )
){
    window.location.href =
        "login.html";
}

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

function logout(){

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
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
        
        const user = {
            fullName: fullName,
            email: email,
            password: password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Account created successfully!");

        window.location.href =
            "login.html";       
        }
    );
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

    if(
        !document.getElementById("total-tasks")
    ){
        return;
    }

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

    if(!container){
        return;
    }

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

const loginForm =
    document.getElementById("login-form");

if(loginForm){

    loginForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            alert("Login button clicked");

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            if(
                email === "" ||
                password === ""
            ){
                alert(
                    "Please fill all fields"
                );
                return;
            }
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if(
                !user ||
                user.email !== email ||
                user.password !== password
            ){
                alert(
                    "Invalid Email or Password"
                );

                return;
            }

            localStorage.setItem(
                "loggedInUser",
                email
            );

            alert(
                "Login Successful"
            );

            window.location.href =
            "dashboard.html";
        }
    );
}

if(
    document.getElementById(
        "tasks-container"
    )
){
    renderTasks();
}
            
const userNameElement =
    document.getElementById("user-name");

if(userNameElement){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if(user){
        userNameElement.textContent =
            user.fullName;
    }
}

function loadDashboardStats(){

    const totalElement =
        document.getElementById(
            "dashboard-total-tasks"
        );

    if(!totalElement){
        return;
    }

    let completed = 0;

    for(let i = 0; i < tasks.length; i++){

        if(tasks[i].completed){
            completed++;
        }
    }

    const pending =
        tasks.length - completed;

    document.getElementById(
        "dashboard-total-tasks"
    ).textContent = tasks.length;

    document.getElementById(
        "dashboard-completed-tasks"
    ).textContent = completed;

    document.getElementById(
        "dashboard-pending-tasks"
    ).textContent = pending;
}

loadDashboardStats();

function loadRecentTasks(){

    const recentTasksContainer =
        document.getElementById(
            "recent-tasks"
        );

    if(!recentTasksContainer){
        return;
    }

    recentTasksContainer.innerHTML = "";

    const limit =
        Math.min(tasks.length, 5);

    for(let i = 0; i < limit; i++){

        const task = tasks[i];

        const status =
            task.completed
            ? "Completed"
            : "Pending";

        const taskDiv =
            document.createElement("div");

        taskDiv.classList.add("task");

        taskDiv.innerHTML = `
            <span>${task.title}</span>
            <span>${status}</span>
        `;

        recentTasksContainer.appendChild(
            taskDiv
        );
    }
}

loadRecentTasks();