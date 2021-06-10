const URL = "https://api.covid19api.com/summary";
const form = document.getElementById("form");
const search = document.getElementById("search");
const accur = document.querySelector("#accurate");
const recover = document.querySelector(".recovry");
const conformed = document.querySelector(".conformed");
const dead = document.querySelector(".deaths");
const update = document.querySelector(".updated");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getText(user);
    search.value = "";
  }
});

async function getText(ans) {
  const res = await fetch(URL);
  const data = await res.json();
  for (let i = 0; i <= data.Countries.length; i++) {
    if (data.Countries[i].Country.toUpperCase() === ans.toUpperCase()) {
      r = data.Countries[i].TotalRecovered;
      c = data.Countries[i].TotalConfirmed;
      d = data.Countries[i].TotalDeaths;
      setInfo(ans);
      setbox(r, c, d);
      accur.classList.remove("hidden");
      recover.textContent = `RECOVERED CASED : ${r}`;
      conformed.textContent = `CONFORMED CASED : ${c}`;
      dead.textContent = `DEATHS : ${d}`;
      update.textContent = ` The Data is Update on : ${data.Countries[
        i
      ].Date.slice(0, 10)}`;
    }
  }
}

function setInfo(value) {
  document.querySelector(
    ".info"
  ).innerHTML = `<h1 class="country">${value}</h1>`;
}

function setbox(rec, con, ded) {
  document.querySelector(".boxs").innerHTML = `

  <div class="box con">
            <h3>Recovered</h3>
            <h2 class="con">${rec / 1000000} M</h2>
          </div>
          <div class="box rec">
            <h3>Confirmed</h3>
            <h2 class="rec">${con / 1000000} M</h2>
          </div>
          <div class="box ded">
            <h3>Deaths</h3>
            <h2 class="ded">${ded / 1000000} M</h2>
          </div>
  `;
}

function sendError() {
  document.querySelector(".boxs").innerHTML = `
  <div class="error">

  <h1>Please Enter the Standard Country name ?</h1>
  
</div>
  
  `;
}
