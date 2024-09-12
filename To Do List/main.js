let addButton = document.querySelector(".inputbox button")
let workiList = document.querySelector(".list")

document.addEventListener("DOMContentLoaded",()=>{
        let task = JSON.parse(localStorage.getItem("tasks"))
        console.log(typeof task);
        
        task.forEach(addTaskToList)    
        
})
addButton.addEventListener("click", () => {
        let inputbox = document.querySelector(".inputbox input")
        let inputvalue = inputbox.value;
        if (inputbox.value == "") {
                alert("please input Your Work")
        }
        else {
                addTaskToList(inputvalue);
                inputbox.value = ""
                saveTask()
        }
})


function addTaskToList(task) {
        const workItem = document.createElement("div");
        workItem.classList.add('work');
        workItem.innerHTML = `<span class="task">${task}</span><button class="delete-btn">Delete</button></div>`
        workiList.appendChild(workItem)
}

workiList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
                e.target.parentElement.remove()
                saveTask()
        }
})

let saveTask=()=>{
        let tasks = Array.from(document.querySelectorAll(".work span")).map(item => item.textContent)
        localStorage.setItem('tasks',JSON.stringify(tasks))
}