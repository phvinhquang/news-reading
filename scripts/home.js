"use strict";
const loginModal = document.getElementById("login-modal");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

console.log(currentAcc);
console.log(welcomeMessage);

// Hiển thị Home nếu có người đăng nhập
if (currentAcc) {
  loginModal.style.display = "none";
  welcomeMessage.textContent = `Xin chào, ${currentAcc.firstName}`;
  btnLogout.style.display = "block";
} else {
  loginModal.style.display = "block";
  welcomeMessage.textContent = "";
  btnLogout.style.display = "none";
}

// Sự kiện Logout
btnLogout.addEventListener("click", function () {
  if (currentAcc) {
    if (confirm("Bạn chắc chắn chứ ?")) {
      // Xóa thông tin trong local storage
      currentAcc = null;
      localStorage.removeItem("currentAcc");
      console.log(currentAcc);

      // Chuyển về trang login
      window.location.href = "pages/login.html";
    }
  }
});
