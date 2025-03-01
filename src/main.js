import "./style.css";

document.querySelectorAll(".openModal").forEach((item) => {
    item.addEventListener("click", function() {
        document.getElementById("modal").style.display = "flex";
    });
});

// document.querySelectorAll(".openModal").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "flex";
// });

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

window.onclick = function(event) {
    if (event.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
};

class Task {
    constructor(title, description, dueDate, dueTime, priority, status, note) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
        this.status = status;
        this.note = note;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.pendingTasks = document.querySelector('#card--pending');
        this.progressTasks = document.querySelector('#card--progress');
        this.completedTasks = document.querySelector('#card--complete');
        this.dashboardText = document.querySelector('.dashboard--text');

        this.addTask = document.querySelector('#submit--btn');
        this.addTask.addEventListener('click', (e) => this.addCardToTask(e));
        this.renderTasks();
    }

    createTask(e) {
        e.preventDefault(e);
        const titleEl = document.querySelector('#title').value;
        const descriptionEl = document.querySelector('#description').value;
        const dueDateEl = document.querySelector('#dateInput').value;
        const dueTimeEl = document.querySelector('#timeInput').value;
        const priorityEl = document.querySelector('#priority').value;
        const statusEl = document.querySelector('#status').value;
        const noteEl = document.querySelector('#note').value;
    
        return new Task(titleEl, descriptionEl, dueDateEl, dueTimeEl, priorityEl, statusEl, noteEl);
    }

    getCardHtml() {
        return this.tasks.map((task, index) => {
            return `<div class="card">
            <h3 class="padding">${task.priority}</h3>
            <br />
            <div class="padding task--date">
              <h4>Date Added</h4>
              <p>${task.dueDate} - ${task.dueTime}</p>
            </div>
            <br />
            <div class="padding task--title">
              <h4>Title</h4>
              <p>${task.title}</p>
            </div>
            <br />
            <div class="padding task--description">
              <h4>Description</h4>
              <p>${task.description}</p>
            </div>
            <br />
            <div class="padding task--note">
              <h4>Notes</h4>
              <div class="task--note-number">1</div>
              <div class="task--note-delete"></div>
            </div>
          </div>`
        }).join('');
    }

    addCardToTask(e) {
        const card = this.createTask(e);
        if (!card) return;
        this.tasks.push(card);
        this.dashboardText.style.display = "none";
        this.renderTasks();
    }

    renderTasks() {
        this.pendingTasks.innerHTML = this.getCardHtml();
    } 
}

new TaskManager();

