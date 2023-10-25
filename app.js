const input = document.querySelector("input");
// console.log(name.value);
const btn = document.querySelector("button");
// console.log(btn);
const ul = document.querySelector(".ul");
const msg = document.getElementById("msg");

btn.addEventListener("click", () => {
  const url = `https://restcountries.com/v3.1/name/${input.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => ekle(data));
});

function ekle(data) {
  //   console.log(data);
  if (data.status == 404) {
    msg.innerText = data.message;
    input.value = "";
    setTimeout(() => {
      msg.innerText = "";
    }, 4000);
    return;
  } else {
    const li = document.createElement("li");
    const {
      capital,
      currencies,
      flags: { png },
      languages,
      name: { common },
      name: { official },
      population,
    } = data[0];
    // console.log(currencies);
    // console.log(Object.values(currencies));

    li.innerHTML = `<div class="card kutu" style="width: 18rem;">
  <img src="${png}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${common} - ${official}</h5>
    </div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Languages: ${Object.values(languages)}</li>
  <li class="list-group-item">Capital: ${capital}</li>
  <li class="list-group-item">Currencies: ${
    Object.values(currencies)[0].name
  } - SYMBOL: ${Object.values(currencies)[0].symbol}</li>
  <li class="list-group-item">Population: ${population}</li>
  </ul>
  
</div>`;
    ul.prepend(li);
  }
  input.value = "";
}

input.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    btn.click();
  }
});
