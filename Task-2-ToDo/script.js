const addTaskBtn = document.querySelector("#addtask");
const taskInput = document.querySelector("#searchInput");
const taskLists = document.querySelector(".listSection");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");

const allBtn = document.querySelector("#allBtn");
const pendingBtn = document.querySelector("#pendingBtn");
const completedBtn = document.querySelector("#completedBtn");

const clearCompletedBtn = document.querySelector("#clearComplete");
const clearAllBtn = document.querySelector("#clearAll");

clearAllBtn.addEventListener('click',() => {
    const allTasks = document.querySelectorAll(".doWork");
    allTasks.forEach(task => {
        task.remove();
    });
    updateCounts();
    saveTasks();
})

clearCompletedBtn.addEventListener('click',() => {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(task => {
       task.remove(); 
    })
    updateCounts();
    saveTasks();
})

allBtn.addEventListener('click',()=>{
    const tasks = document.querySelectorAll(".doWork");
    tasks.forEach(task => {
        task.style.display = "flex";
    });
});

pendingBtn.addEventListener("click",() => {
    const tasks = document.querySelectorAll(".doWork");
    tasks.forEach(task => {
        if(task.classList.contains("completed")){
            task.style.display = "none";
        }
        else{
            task.style.display = "flex";
        }
    })
})

completedBtn.addEventListener('click',() => {
    const tasks = document.querySelectorAll(".doWork");

    tasks.forEach(task => {
        if(task.classList.contains("completed")){
            task.style.display = "flex";
        }
        else{
            task.style.display = "none";
        }
    });
});

function updateCounts(){
    const allTasks = document.querySelectorAll(".doWork");
    const completedTasks = document.querySelectorAll(".completed");

    const total = allTasks.length;
    const completed = completedTasks.length;
    const pending = total - completed;

    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function saveTasks(){
    localStorage.setItem("todoData",taskLists.innerHTML);
}

function loadTasks(){
    taskLists.innerHTML = localStorage.getItem("todoData")||"";
}

addTaskBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();
    if(taskText === ""){
        alert("Please Enter the Task");
        return;
    }

    const newTask = document.createElement("div");

    newTask.className = "doWork";

    newTask.innerHTML = `
    <input type="checkbox" class="check">

    <p>${taskText}</p>

    <div class="rightSide">
        <p class="taskTime">📅 31 Jul 2026, 9:15 AM</p>
        <button class="deleteBtn">🗑️</button>
    </div>`;
    taskLists.appendChild(newTask);

    updateCounts();
    saveTasks();

    taskInput.value = "";   
});


taskInput.addEventListener("keydown",(e) => {
    if(e.key === "Enter"){
        addTaskBtn.click();
    }
})
loadTasks();
updateCounts();

taskLists.addEventListener("click",(e) => {
    if(e.target.classList.contains("deleteBtn")){
        e.target.closest(".doWork").remove();
        updateCounts();
        saveTasks();
    }
})

taskLists.addEventListener("change",(e) => {
    if(e.target.classList.contains("check")){
        const task = e.target.closest(".doWork");
        if(e.target.checked){
            task.classList.add("completed");
        }
        else{
        task.classList.remove("completed");
        }
        updateCounts();
        saveTasks();
    }
      
})

