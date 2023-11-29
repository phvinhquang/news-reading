"use strict";

const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");

const btnRegister = document.getElementById("btn-submit");

// Hàm clearinput
const clearInput = function () {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
};

// Hàm validate dữ liệu
const validate = function (data) {
  let isValidated = true;

  if (data.firstName.trim() === "") {
    alert("Không được để trống Firstname");
    isValidated = false;
  }
  if (data.lastName.trim() === "") {
    alert("Không được để trống Lastname");
    isValidated = false;
  }
  if (data.username.trim() === "") {
    alert("Không được để trống Username");
    isValidated = false;
  } else {
    userArr.forEach(function (user) {
      if (data.username === user.username) {
        alert("Username này đã có người đăng kí, hãy chọn username khác");
        isValidated = false;
      }
    });
  }
  if (data.password.length <= 8) {
    alert("Password phải có ít nhất 8 kí tự");
    isValidated = false;
  }
  if (data.password !== inputPasswordConfirm.value) {
    alert("Mật khẩu chưa trùng khớp");
    isValidated = false;
    console.log(data.password, inputPasswordConfirm.value);
  }

  return isValidated;
};

// Sự kiện nút Register
btnRegister.addEventListener("click", function () {
  console.log(inputPasswordConfirm.value);
  const inputData = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    username: inputUsername.value,
    password: inputPassword.value,
  };

  // Validate dữ liệu
  if (validate(inputData)) {
    const user = new User(
      inputData.firstName,
      inputData.lastName,
      inputData.username,
      inputData.password,
      5,
      "General"
    );

    userArr.push(user);
    saveToStorage("userArr", userArr);
  }

  // Xóa input
  clearInput();

  // Chuyển về trang login
  window.location.href = "../pages/login.html";
});

document.getElementById("btn-random").addEventListener("click", function () {
  // Chuyển về trang login
  window.location.href = "../pages/login.html";
});
