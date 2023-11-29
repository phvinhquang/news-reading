"use strict";

const inputSearch = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");
const btnSearch = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

console.log(currentAcc);
console.log(userArr);

// Hàm Display News
const displayNews = function (data) {
  // Xóa content
  newsContainer.innerHTML = "";

  data.articles.forEach(function (article) {
    // Content
    const html = `
   <div class="card flex-row flex-wrap">
   <div class="card mb-3" style="">
     <div class="row no-gutters">
       <div class="col-md-4">
         <img src="${
           article.urlToImage ? article.urlToImage : "../noImage.jpg"
         }"
           class="card-img"
           alt="${article.title}">
       </div>
       <div class="col-md-8">
         <div class="card-body">
           <h5 class="card-title">${article.title}</h5>
           <p class="card-text">${
             article.description ? article.description : "Click View to read"
           }</p>
           <a href="${article.url}"
             class="btn btn-primary">View</a>
         </div>
       </div>
     </div>
   </div>
 </div>
   `;

    //Hiển thị bài viết
    newsContainer.insertAdjacentHTML("beforeend", html);
  });
};

// Hàm hiển thị nút Prev, Next
const displayPrevNext = function (data) {
  if (Number(pageNum.textContent) === 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }

  if (
    Number(pageNum.textContent) ===
    Math.ceil(data.totalResults / currentAcc.pageSize)
  ) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};

let page = 1;

// Fetch data
const getNewsByKeyword = async function (keyword, page) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&sortBy=relevancy&apiKey=5ad24bf3d6484757b4942c1d74bf78e9&pageSize=${currentAcc.pageSize}&page=${page}`
  );
  const data = await res.json();
  console.log(data);
  displayNews(data);
  displayPrevNext(data);
};

//Event nút Search
btnSearch.addEventListener("click", function () {
  if (inputSearch.value.trim() === "") {
    alert("Bạn chưa điền thông tin tìm kiếm");
  } else {
    getNewsByKeyword(inputSearch.value);
  }
});

//Event nút Next, Prev
btnNext.addEventListener("click", function () {
  page++;
  console.log(page);
  pageNum.textContent = page;
  console.log(pageNum.textContent);
  getNewsByKeyword(inputSearch.value, page);
});

btnPrev.addEventListener("click", function () {
  page--;
  pageNum.textContent = page;
  getNewsByKeyword(inputSearch.value, page);
});
