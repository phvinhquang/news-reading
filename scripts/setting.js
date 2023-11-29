"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSaveSettings = document.getElementById("btn-submit");

console.log(currentAcc);
console.log(userArr);

//Event nút Save Setting
btnSaveSettings.addEventListener("click", function () {
  if (currentAcc) {
    const inputData = {
      pageSize: inputPageSize.value,
      category: inputCategory.value,
    };

    if (inputData.pageSize <= 0) {
      alert("Giá trị này không được nhỏ hơn hoặc bằng 0");
    } else {
      // Cập nhật currentAcc trong local storage
      currentAcc.pageSize = inputData.pageSize;
      currentAcc.category = inputData.category;
      saveToStorage("currentAcc", currentAcc);

      // Cập nhật userArr trong local storage
      const curAcc = userArr.find(
        (acc) => acc.username === currentAcc.username
      );
      curAcc.pageSize = inputData.pageSize;
      curAcc.category = inputData.category;
      saveToStorage("userArr", userArr);

      alert("Chỉnh sửa thành công");
    }
  } else {
    alert("Bạn cần đăng nhập trước khi thay đổi setting");
  }
});

// Display setting tương ứng với người dùng hiện tại
const displaySetting = function () {
  if (currentAcc) {
    inputPageSize.value = currentAcc.pageSize;
    inputCategory.value = currentAcc.category;
  }
};
displaySetting();
