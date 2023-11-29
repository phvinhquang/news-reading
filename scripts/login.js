"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// Event nhấn nút Login
let currentAccount;
btnLogin.addEventListener("click", function () {
  const username = inputUsername.value;
  const password = inputPassword.value;

  // Kiểm tra các trường có được nhập đầy đủ không
  if (username.trim() === "" || password === "") {
    alert("Không được để trống username và password");
  } else {
    // Kiểm tra thông tin đăng nhập chính xác không
    currentAccount = userArr.find((acc) => acc.username === username);

    if (!currentAccount || currentAccount.password !== password) {
      alert("Thông tin đăng nhập không đúng");
    } else if (currentAccount && currentAccount.password === password) {
      alert("Đăng nhập thành công");

      // Lưu currentAccount xuống local storage
      saveToStorage("currentAcc", currentAccount);

      // Chuyển hướng về Home
      window.location.href = "../index.html";
    }
  }
});
