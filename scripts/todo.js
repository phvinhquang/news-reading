"use strict";

const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");
const toDoListEl = document.getElementById("todo-list");
const toDoInput = document.querySelector(".todo-list-header");
const notification = document.querySelector(".notification");

// Hiển thị thông báo cần đăng nhập
if (currentAcc) {
  toDoInput.style.display = "block";
  notification.style.display = "none";
} else {
  toDoInput.style.display = "none";
  notification.style.display = "block";
}

//Hàm hiển thị todo list
const displayTask = function () {
  toDoListEl.innerHTML = "";
  // Hiển thị task của người dùng hiện tại
  taskArr.forEach(function (task, i) {
    if (task.owner === currentAcc.username) {
      const html = `
  <li class = "todo-item ${task.isDone ? "checked" : ""}" data-num ="${i}">
		${task.task}
		<span class="close" onclick ="deleteTask(${i})" >×</span>
	</li>
  `;
      toDoListEl.insertAdjacentHTML("beforeend", html);
    }
  });
};
displayTask();

// Hàm xóa task
function deleteTask(i) {
  taskArr.splice(i, 1);
  saveToStorage("taskArr", taskArr);
  displayTask();
}

// Sự kiện nút Add task
btnAdd.addEventListener("click", function () {
  const toDo = inputTask.value;

  //Check xem có tài khoản đang đăng nhập không, trường có để trống không
  if (!currentAcc) {
    alert("Bạn cần đăng nhập để tiếp tục");
  } else if (toDo.trim() === "") {
    alert("Không được để trống việc cần làm");
  } else {
    const task = new Task(toDo, currentAcc.username, false);

    // Đưa task mới vào taskArr, lưu trữ và hiển thị
    taskArr.push(task);
    saveToStorage("taskArr", taskArr);
    // Hiển thị todo list
    displayTask();
    // Xóa input
    inputTask.value = "";
  }
});

// Sự kiện khi nhấn vào todo item
toDoListEl.addEventListener("click", function (e) {
  // Tránh chọn nhầm cả x
  if (e.target.classList.contains("todo-item")) {
    //Toggle class checked
    e.target.classList.toggle("checked");

    //Thay đổi thông tin trong Instance tương ứng
    const index = e.target.dataset.num;
    console.log(index);
    taskArr[index].isDone = e.target.classList.contains("checked")
      ? true
      : false;
  }
  saveToStorage("taskArr", taskArr);
  displayTask();
});
