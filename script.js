const taskContainer = document.querySelector('[data-tasks]')
const newTaskForm = document.querySelector("[data-new-task-form]")
const newTaskInput = document.querySelector("[data-new-task-input]")


const LOCAL_STORAGE_TASK_KEY = "task.lists"
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY))||[]

newTaskForm.addEventListener("submit", e =>{
    e.preventDefault()
    const taskName = newTaskInput.value 
    if (taskName == null || taskName ==="") return 
    const task = createTask(taskName)
    newTaskInput.value = null
    tasks.push(task)
   saveAndRender()
})

function createTask(name){
    return{ id: Date.now().toString(), name: name}
}

function saveAndRender(){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
}

function render() {
    clearElement(taskContainer)
    tasks.forEach(task => {
    const taskElement = document.createElement("li")
    taskElement.dataset.taskId = task.id 
    taskElement.classList.add("task")
    taskElement.innerText = task.name
    taskContainer.appendChild(taskElement)
})

}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }

}

render()