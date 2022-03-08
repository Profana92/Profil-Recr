//Deklaracja elementow po Id
const countriesElement = document.querySelector("#countries");
const searchEl = document.querySelector("#search");
let result = "";
getCountries();

//Funkcja pobierajaca dane i wywolujaca displayCountries(countries)
async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  displayCountries(countries);
}

function getCurrenciesList(country) {
  function CurrencyAboveOne(country) {
    if (country.currencies === undefined) return "brak informacji";
    else if (Object.values(country.currencies).length === 1)
      return Object.values(country.currencies);
    else {
      for (let i = 0; i < Object.values(country.currencies).length; i++) {
        console.log(Object.values(country.currencies)[i].name);
      }
    }
  }
  CurrencyAboveOne(country);
  if (country.currencies != undefined) {
    result = `${Object.keys(country.currencies)} + ${
      Object.values(country.currencies)[0].name
    } + ${Object.values(country.currencies).length}`;
    console.log(Object.values(country.currencies));
  } else result = "Brak danych";
  return result;
}
// Funkcja wypisywania tabeli, iterujaca każdy rząd tabeli aż do jej zbudowania przy pomocy forEach, dodajaca jedna klase i ukrywająca tekst szukaj poprzed podmianke tekstu wewnatrz elementu na pusty
function displayCountries(countries) {
  let countryCurrenciesList = "";
  let countryLanguagesList = "";
  let countryInnerText = "";

  countries.forEach((country) => {
    countryCurrenciesList = getCurrenciesList(country);
    const countryEl = document.createElement("tr");
    countryEl.classList.add("table-row");
    countryInnerText = `<td class=searchEle>${country.name.common}</td><td>${countryCurrenciesList}</td><td>${countryLanguagesList}</td><td>${country.area}</td>
    <td>${country.population}</td><td><img src="${country.flags.png}" alt="" /></tr>`;
    countryEl.innerHTML = countryInnerText;
    countriesElement.appendChild(countryEl);
  });
  const hiddenElement = document.getElementById("hidden");
  hiddenElement.innerHTML = ``;
}
/*    <td>${countryCurrenciesList)}</td>
<td>${countryLanguagesList)}</td>
    <td>${country.languages.map((c) => `${c.name}`)}</td>
    <td class="aaa">${country.population}</td>
    <td>${country.area}</td> */
//Funkcja sortująca tabelę wywoływania przez onclick w pliku HTML>
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("countries");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      var xContent = isNaN(x.innerHTML)
        ? x.innerHTML.toLowerCase() === "-"
          ? 0
          : x.innerHTML.toLowerCase()
        : parseFloat(x.innerHTML);
      var yContent = isNaN(y.innerHTML)
        ? y.innerHTML.toLowerCase() === "-"
          ? 0
          : y.innerHTML.toLowerCase()
        : parseFloat(y.innerHTML);
      if (dir == "asc") {
        if (xContent > yContent) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xContent < yContent) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

//Funkcja przeszukująca tabęlę i ukrywająca rzędy nie istotne poprzez sprawdzenie indexOf komorek

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("countries");
  tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var flag = false;
    for (var j = 0; j < tds.length; j++) {
      var td = tds[j];
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        flag = true;
      }
    }
    if (flag) {
      tr[i].style.display = "table-row";
    } else {
      tr[i].style.display = "none";
    }
  }
}

/*Funkcja przeszukująca tabęlę i ukrywa rzedy nie w zakresie, obie wartości nie musza
 byc podane, jesli sa puste skrypt wstawia -1 (wystepuja kraje z zerową populacją) 
 dla warosci minimalnej i maksymalną dla krajów samodzielnie na wywolaniu funkcji*/
function searchminmax() {
  var input, filter, table, tr, td, i, min2, max2, minf, maxf;
  minEl = document.getElementById("minpop");
  maxEl = document.getElementById("maxpop");
  min2 = minEl.value;
  max2 = maxEl.value;
  if (max2 == "") {
    max2 = 13774221680;
  }
  if (min2 == "") {
    min2 = -1;
  }
  minf = parseFloat(min2);
  maxf = parseFloat(max2);
  table = document.getElementById("countries");
  tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var flag = false;
    for (var j = 0; j < tds.length; j++) {
      var td = tds[j];
      var tdparse = parseFloat(td.innerHTML);
      if (tdparse > minf && tdparse < maxf) {
        if (td.classList.contains("aaa")) {
          flag = true;
        }
      }
    }
    if (flag) {
      tr[i].style.display = "table-row";
    } else {
      tr[i].style.display = "none";
    }
  }
}
