"use strict";

const addModal = document.getElementById("add-modal");
const openModalButton = document.getElementById("add-modal-button");
const closeModalButton = document.getElementById("close-modal-button");

const modalDelete = document.getElementById("delete-modal");

openModalButton.addEventListener("click", () => {
  addModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  addModal.style.display = "none";
});

const toDoListContainer = document.getElementById("todo-container");
const tagsContainer = document.getElementById("tags-container");

const addTaskButton = document.getElementById("add-task-button");

const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskTagsInput = document.getElementById("task-tags");

const revertButton = document.getElementById("revert-button");

const deleteElements = [];

const tasks = [
  { title: "test", description: "test", tags: ["test", "test2"], done: false },
  {
    title: "coś nie coś",
    description: "coś nie coś potrafie",
    tags: ["coś", "coś nie coś"],
    done: true,
  },
];

const activeTags = [];

function renderTags(items) {
  tagsContainer.innerHTML = "";
  const tags = [...new Set(items.map((item) => item.tags).flat())];

  tags.forEach((tag) => {
    const tagElement = document.createElement("button");
    tagElement.classList.add(
      "tag",
      "bg-gray-200",
      "rounded-full",
      "px-3",
      "py-1",
      "text-sm",
      "font-semibold",
      "text-gray-700",
      "mr-2"
    );
    tagElement.innerText = tag;

    tagElement.addEventListener("click", () => {
      if (activeTags.includes(tag)) {
        activeTags.splice(activeTags.indexOf(tag), 1);
        tagElement.style.backgroundColor = "";
      } else {
        activeTags.push(tag);
        tagElement.style.backgroundColor = "#60a5fa";
      }
      if (activeTags.length > 0) {
        const filteredTasks = items.filter((task) =>
          task.tags.some((tag) => activeTags.includes(tag))
        );
        renderTasks(filteredTasks);
      } else {
        renderTasks(items);
      }
    });

    tagsContainer.appendChild(tagElement);
  });
}
renderTags(tasks);

function renderTasks(items) {
  toDoListContainer.innerHTML = "";

  if (deleteElements.length > 0) {
    revertButton.style.backgroundColor = "";
  } else {
    revertButton.style.backgroundColor = "#d1d5db";
  }

  items.forEach((element, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add(
      "task",
      "max-w-sm",
      "rounded",
      "overflow-hidden",
      "shadow-lg",
      "mt-10"
    );
    taskElement.innerHTML += `     
    <div class="px-6 py-4">
      <div class="flex justify-between">
        <div class="title font-bold text-xl mb-2"><p>${element.title}</p></div>
        <button
          type="button"
          class="delete-task-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    
      <p class="description text-gray-700 text-base">
      ${element.description}
      </p>
    </div>
    <div class="flex justify-between">
      <div class="px-6">
        ${element.tags
          .map((tag) => {
            return `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#${tag}</span>`;
          })
          .join("")}
      </div>
      <button
        type="button"
        class="done-task-button mr-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2 me-2 mb-2"
      >
        <i class="fa-solid fa-check t"></i>
      </button>
    </div>
    `;
    const title = taskElement.getElementsByClassName("title")[0];

    if (!element.done) {
      taskElement.classList.remove("bg-green-100");
      title.getElementsByTagName("p")[0].classList.remove("line-through");
      taskElement
        .getElementsByClassName("description")[0]
        .classList.remove("line-through");

      const dateElement = title.getElementsByClassName("date")[0];
      if (dateElement) dateElement.remove();
    } else {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      const dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.innerText = formattedDate;
      title.appendChild(dateElement);

      title.getElementsByTagName("p")[0].classList.add("line-through");
      taskElement
        .getElementsByClassName("description")[0]
        .classList.add("line-through");

      taskElement.classList.add("bg-green-100");
    }

    toDoListContainer.appendChild(taskElement);
    taskElement
      .getElementsByClassName("delete-task-button")[0]
      .addEventListener("click", () => {
        modalDelete.style.display = "block";
        modalDelete.classList.add("task-" + index);
        document.getElementById("task-title-modal").innerText =
          "Task title: " + element.title;
      });

    taskElement
      .getElementsByClassName("done-task-button")[0]
      .addEventListener("click", () => {
        element.done = !element.done;
        renderTasks(items);
      });
  });
}

renderTasks(tasks);

addTaskButton.addEventListener("click", () => {
  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskTags = taskTagsInput.value.split(" ");

  if (taskTitle.trim().length === 0 || taskDescription.trim().length === 0) {
    alert("Please enter a valid task title and description.");
    return;
  }

  tasks.push({
    title: taskTitle,
    description: taskDescription,
    tags: taskTags,
  });
  renderTasks(tasks);
  renderTags(tasks);

  addModal.style.display = "none";
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  taskTagsInput.value = "";
});

const deleteTaskButtons = document.querySelector(".delete-task-button");

const modalConfirm = document.getElementById("delete-modal-confirm");
const modalDecline = document.getElementById("delete-modal-decline");

const modalClose = document.getElementById("delete-modal-hide");

modalConfirm.addEventListener("click", () => {
  modalDelete.style.display = "none";
  const taskIndex = Array.from(modalDelete.classList).find((element) =>
    element.includes("task-")
  );
  const deletedTasks = tasks.splice(taskIndex.split("-")[1], 1);
  deleteElements.push(deletedTasks[0]);
  modalDelete.classList.remove(taskIndex);

  renderTasks(tasks);
});

modalDecline.addEventListener("click", () => {
  modalDelete.style.display = "none";
});

modalClose.addEventListener("click", () => {
  modalDelete.style.display = "none";
});

function filterTasks(searchTerm) {
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  renderTasks(filteredTasks);
}

const search = document.getElementById("search");

search.addEventListener("input", (event) => {
  if (event.target.value === "") {
    renderTasks(tasks);
    return;
  }
  filterTasks(event.target.value);
});

revertButton.addEventListener("click", () => {
  if (deleteElements.length === 0) {
    return;
  }
  const deletedElement = deleteElements.pop();
  tasks.push(deletedElement);
  renderTasks(tasks);
});
