"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

console.log(currentAcc);
//Hàm hiển thị tin tức
const displayNews = function (data) {
  // Xóa content
  newsContainer.innerHTML = "";

  data.articles.forEach(function (article) {
    // Content
    const html = `
  <div class="card flex-row flex-wrap">
  <div class="card news" style="">
    <div class="row no-gutters">
      <div class="col-md-4 image-container">
        <img src="${article.urlToImage ? article.urlToImage : "../noImage.jpg"}"
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
console.log(pageNum.textContent);

// Fetch data
let country = "us";
let page = 1;

const getNews = async function (country = "us", page) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      currentAcc.category || ""
    }&apiKey=5ad24bf3d6484757b4942c1d74bf78e9&pageSize=${
      currentAcc.pageSize || 5
    }&page=${page}`
  );
  const data = await res.json();
  console.log(data);

  //Hiển thị tin tức và nút next, prev
  displayNews(data);
  displayPrevNext(data);
};
getNews(country, page);

//Event nút Next, Prev
btnNext.addEventListener("click", function () {
  page++;
  pageNum.textContent = page;
  getNews(country, page);

  console.log(page);
  console.log(pageNum.textContent);
});

btnPrev.addEventListener("click", function () {
  page--;
  pageNum.textContent = page;
  getNews(country, page);
});
