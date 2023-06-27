const input = document.querySelector("#input");
const searchbtn = document.querySelector("#searchbtn");
const clearbtn = document.querySelector("#clearbtn");

const imageWrapper = document.querySelector(".imageWrapper");
const form = document.querySelector("#form");

runEventListenners();

function runEventListenners() {
  form.addEventListener("submit", search);
  clearbtn.addEventListener("click", clear);
}

function search(e) {
  let value = input.value.trim();
  if (value.length > 0) {
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Array.from(data.results).forEach((image) => {
          addUrlsToImage(image.urls.small);
        });
      })
      .catch((err) => console.log(err));
  } else {
    alert("İlk Önce Bize Ne Aramak İstediğini Yaz ");
  }

  imageWrapper.innerHTML = "";
  e.preventDefault();
}

input.addEventListener("click", clear);

function addUrlsToImage(url) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = url;
  img.height = img.width = 400;
  div.appendChild(img);
  imageWrapper.appendChild(div);
}

function clear() {
  imageWrapper.innerHTML = "";
  input.value = "";
}
