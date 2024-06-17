const countryName = new URLSearchParams(window.location.search).get("name");
const countryFlag = document.querySelector(".country-details img");
const countryName1 = document.querySelector(".details-text-container > h2");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital-city");
const TopLevelDomain = document.querySelector(".domain");
const currencies = document.querySelector(".currency");
const launguage = document.querySelector(".launguage");
const borderCountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true
`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    countryFlag.src = country.flags.svg;
    countryName1.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital[0];
    }
    TopLevelDomain.innerText = Object.values(country.tld).join(", ");

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.capital) {
      capital.innerText = Object.values(country.capital)
        .map((capital) => capital)
        .join(", ");
    }

    if (country.languages) {
      launguage.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            if (borderCountry.name) {
              borderCountryTag.innerText = borderCountry.name.common;
            } else {
              borderCountryTag.innerText = "jdjd";
            }
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            console.log(borderCountryTag);
            borderCountries.append(borderCountryTag);
          });
      });
    } else {
    }
  });

//
const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");
const themeChange = document.querySelector(".theme-change");
const body = document.querySelector("body");
// dark theme
themeChange.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeChange.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeChange.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});
