const button = document.getElementById('tasks__add'); // доступ к кнопке
const input = document.getElementById('task__input'); // доступ к полю
const taskList = document.getElementById('tasks__list'); // доступ к окну со списком 
let index = 0;

// работа с localStorage
for (key in localStorage) {
    if (!localStorage.hasOwnProperty(key)){
        continue; // пропустить все кроме номеров ключей
    } else { // если номер ключа
        let newTask = document.createElement('div'); // объявить новоый элемент
        newTask.className = 'task'; // с классом task
        newTask.innerHTML = '\
            <div class="task__title"></div> \
            <a href="#" class="task__remove">&times;</a>\
        '; // костыльный метод добавления вложенного элемента

        taskList.insertBefore(newTask, taskList.firstElementChild); // добавить новую задачу в список задач
        document.querySelectorAll('.task__title')[0].textContent = localStorage.getItem(key); // такст первого элемента списка заменить на значение ввода
        index++;
    }
}


button.addEventListener('click', addTask); // обработчик клика на кнопку

function addTask(evnt) { // добавление задачи
    input.value = input.value.trim(); // убрать пробелы по сторронам от текста
    if (input.value != '') { // если есть значение в поле ввода 
        let newTask = document.createElement('div'); // объявить новоый элемент
        newTask.className = 'task'; // с классом task
        newTask.innerHTML = '\
            <div class="task__title"></div> \
            <a href="#" class="task__remove">&times;</a>\
        '; // костыльный метод добавления вложенного элемента

        taskList.insertBefore(newTask, taskList.firstElementChild); // добавить новую задачу в список задач
        document.querySelectorAll('.task__title')[0].textContent = input.value; // такст первого элемента списка заменить на значение ввода
        localStorage.setItem(index, input.value);
        index++;
        input.value = ''; // очистить ввод
    }
    evnt.preventDefault();
}

taskList.onclick = function(e) { // обработка перехвата клика 
    if (e.target.classList.contains('task__remove')) { // если событие указывает на элемент с классом task__remove
        deletingStorageItem(e.target.previousElementSibling.textContent); // передать в функцию контент предыдущего соседнего элемента
        e.target.parentElement.remove(); // тогда удалить родительский элемент - всю задачу
    }
}

function deletingStorageItem(value) { // удаление элементов из localStorage
    for (key in localStorage) {
        if (!localStorage.hasOwnProperty(key)){
            continue; // пропустить все кроме номеров ключей
        } else if (localStorage.getItem(key) === value) { // если значение ключа = аргументу функции
            localStorage.removeItem(key); // удалить ключ
            return false; // выйти из функции
        }
    }
}