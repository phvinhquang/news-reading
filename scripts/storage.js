"use strict";

// Hàm lưu trữ dữ liệu nhập vào localstorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ Storage
function getFromStorage(key, de) {
  return localStorage.getItem(key);
}

//Hàm chuyển object => instance User
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

// Hàm chuyển object => instance Task
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}

//Lấy data từ local storage và đưa vào userArr
const userData = JSON.parse(getFromStorage("userArr")) ?? [];

const userArr = userData.map((data) => parseUser(data));
console.log(userArr);

// Lấy data từ local storage và đưa vào taskArr
const taskData = JSON.parse(getFromStorage("taskArr")) ?? [];
const taskArr = taskData.map((data) => parseTask(data));

// Biến lưu người dùng đang đăng nhập
let currentAcc = JSON.parse(getFromStorage("currentAcc")) ?? "";
