const filterByRegion = document.querySelector(".filter-by-region");
const countriesContainer = document.querySelector(".countries-container");
const searchInput = document.querySelector(".search-container input");
const themeChange = document.querySelector(".theme-change");
const body = document.querySelector("body");
const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");

let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}
`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
    });
});
function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countriesContainer = document.querySelector(".countries-container");
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag" />
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
        </div>`;
    // countryCard.innerHTML = cardHtml;
    countriesContainer.append(countryCard);
    // console.log(country);
  });
}
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  const filterCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filterCountries);
  console.log(filterCountries);
});

// dark mode
themeChange.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeChange.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeChange.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});
