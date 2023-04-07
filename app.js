const button = document.getElementById('tasks__add'); 
const input = document.getElementById('task__input'); 
const taskList = document.getElementById('tasks__list');
let index = 0;

for (key in localStorage) {
    if (!localStorage.hasOwnProperty(key)){
        continue;
    } else { 
        let newTask = document.createElement('div'); 
        newTask.className = 'task'; 
        newTask.innerHTML = '\
            <div class="task__title"></div> \
            <a href="#" class="task__remove">&times;</a>\
        '; 

        taskList.insertBefore(newTask, taskList.firstElementChild); 
        document.querySelectorAll('.task__title')[0].textContent = localStorage.getItem(key);
        index++;
    }
}


button.addEventListener('click', addTask);

function addTask(evnt) { 
    input.value = input.value.trim();
    if (input.value != '') { 
        let newTask = document.createElement('div');
        newTask.className = 'task'; 
        newTask.innerHTML = '\
            <div class="task__title"></div> \
            <a href="#" class="task__remove">&times;</a>\
        '; 

        taskList.insertBefore(newTask, taskList.firstElementChild); 
        document.querySelectorAll('.task__title')[0].textContent = input.value;
        localStorage.setItem(index, input.value);
        index++;
        input.value = ''; 
    }
    evnt.preventDefault();
}

taskList.onclick = function(e) {
    if (e.target.classList.contains('task__remove')) { 
        deletingStorageItem(e.target.previousElementSibling.textContent); 
        e.target.parentElement.remove(); 
    }
}

function deletingStorageItem(value) { 
    for (key in localStorage) {
        if (!localStorage.hasOwnProperty(key)){
            continue; 
        } else if (localStorage.getItem(key) === value) {
            localStorage.removeItem(key); 
            return false; 
        }
    }
}