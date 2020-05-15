const listContainer = document.querySelector("[data-lists]")
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

let lists = ["name" , "todo"]

newTaskForm.addEventListener("submit" , e =>{
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === "") return 
    const task = createTask(taskName)
    newTaskInput.value = null 
    tasks.push(task)
    render()
})

function createTask(name){
    return{id: Date.now().toString(), name: name }

}



function render(){
        
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.classList.add("task")
        listElement.innerText =list
        listContainer.appendChild(listElement)
    })
}

function clearElement(element){
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }

}

render ()