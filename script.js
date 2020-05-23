const taskContainer = document.querySelector('[data-tasks]')
const newTaskForm = document.querySelector("[data-new-task-form]")
const newTaskInput = document.querySelector("[data-new-task-input]")
const deleteTaskButton= document.querySelector("[data-delete-task-button]")
const dataTaskCount = document.querySelector("[data-task-count]")
const currentDate = document.querySelector("[today-date]")


const LOCAL_STORAGE_TASK_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_TASK_ID_KEY = "task.selectedTaskId"
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY))||[]
let selectedTaskId = localStorage.getItem
(LOCAL_STORAGE_SELECTED_TASK_ID_KEY )

taskContainer.addEventListener('click', e => {
    if( e.target.tagName.toLowerCase()==='li'){
        selectedTaskId= e.target.dataset.taskId
        saveAndRender()
    }
})

deleteTaskButton.addEventListener('click', e => {
    tasks = tasks.filter(task => task.id !== selectedTaskId)
    selectedTaskId =null
    saveAndRender()
})


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
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TASK_ID_KEY, selectedTaskId)
}


function render() {
    clearElement(taskContainer)
    renderTasks()

    renderTaskCount()
}

function renderTaskCount(){
    const incompleteTaskCount = tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks" 
    dataTaskCount.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderTasks(){
    tasks.forEach(task => {
        const taskElement = document.createElement("li",)
        taskElement.dataset.taskId = task.id 
        taskElement.classList.add("task")
        taskElement.innerText = task.name
        if (task.id === selectedTaskId){
            taskElement.classList.add("active-task")
        }
        taskContainer.appendChild(taskElement)
    })
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }

}

render()
  

