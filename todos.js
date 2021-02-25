document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#taskForm');
  const taskInput = document.querySelector('input[name="newTask"]');
  const ul = document.querySelector('ul');
  const taskList = document.querySelector('#task-list');

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  for(let task of savedTasks) {
    let newTask = document.createElement('li');
    newTask.innerText = task.task;

    const button = document.createElement('button');
    button.innerHTML = 'remove';
    newTask.append(button);

    taskList.append(newTask);
  }
  // Add a new todo (by submitting a form)
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = 'remove';

    li.innerText = taskInput.value;
    li.append(button);
    ul.append(li);

    form.reset();

    savedTasks.push({task: li.childNodes.item(0).nodeValue});
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  // Mark a todo as completed (cross out the text of the todo)
  // Remove a todo
  taskList.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      evt.target.parentElement.remove();

      localStorage.removeItem('tasks'); 

    } else if (evt.target.tagName === 'LI') {
      evt.target.classList.toggle('strike');
    };
  });

});