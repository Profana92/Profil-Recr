//Wywołani funkcji getCountries
getCountries();
//Potrzebuje potem dostepu do tej zmiennej spoza funkcji wiec deklaruje na poczatku dokumentu.
let subarraylist = new Array();
let subarraycurrencieslist = new Array();
const countriesEl = document.getElementById('countries')

async function getCountries()
{
  //Fetch Arraya
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();
  //Przypisanie wartości początkowych
  let popcount = 0;
  let avgarea = 0;
  let array = countries;

  //Console Log do przeglądania całej tablicy ułatwia prace na danych przy pisaniu kodu
  console.log(array);

  /*Obliczanie ilości ludności poprzez ForEach przeszukujący tabelę i znajdujący wartości w kolejnych kolumnach i dodający je do poprzedniej wartości. 
  Poprzez iteracje realizujemy od razu kroki dla średniej populacji i obszaru bo to ostatecznie to samo*/
  array.forEach(country => 
  {
    popcount = popcount + country.population
    avgarea = avgarea + country.area
  });

  // utworzenie subarraya z samymi językami i wpisanie ich do nowej tablicy nazwanej subarray
  let subarray = new Array();
  let i = 0;
  array.forEach(country => 
  {
    subarray[i] = country.languages.map(c =>`${c.name}`);
    i=i+1;
    return subarray;
  });
  let ilosckrajow = i - 1;
  // utworzenie subarraya z samymi walutami i wpisanie ich do nowej tablicy nazwanej subarraycurrencies
  let subarraycurrencies = new Array();
  i = 0;
  array.forEach(country => 
  {
    subarraycurrencies[i] = country.currencies.map(c =>`${c.name}`);
    i=i+1;
    return subarraycurrencies;
  });

  // utworzenie subarraya z samymi sasiadami i wpisanie ich do nowej tablicy nazwanej subarrayborders
  let subarrayborders = new Array();
  i = 0;
  array.forEach(country => 
  {
    subarrayborders[i] = country.borders.map(c =>`${c.name}`);
    i=i+1;
    return subarrayborders;
  });

  let countriescount = 0
  //Przeszukanie subarrayborders
  for ( i=0; i<subarrayborders.length; i++ )
  {
    countriescount = countriescount + subarrayborders[i].length;
  }

  //Utworzenie jednowymiarowego arraya poprzez przeszukanie całej subarray i utworzenie nowej o uproszczonej strukturze subarraylist
  for ( i=0; i<subarray.length; i++ )
  {
    for ( j=0; j<subarray[i].length; j++ )
    {
      subarraylist.push(subarray[i][j]);
    }
  }

    //Utworzenie jednowymiarowego arraya poprzez przeszukanie całej subarraycurrencies i utworzenie nowej o uproszczonej strukturze subarraycurrencieslist
  for ( i=0; i<subarraycurrencies.length; i++ )
  {
    for ( j=0; j<subarraycurrencies[i].length; j++ )
    {
      subarraycurrencieslist.push(subarraycurrencies[i][j]);
    }
  }

  /* Konwersja tablicy jednowymiarowej na string i użycie splitu w celu rozdzialu stringa przez przecinek, potem określenie najbardziej popularnych języków
  globalnie a nie względem kraju, zwraca wartość języków używanych w największej ilości krajów a nie te, którymi posługuje się najwieksza liczba ludności*/
  let str = subarraylist.toString();
  const num = 5;
  const findMostFrequent = (subarraylist, num) => 
  {
   const strArr = str.split(',');
   const map = {};
   strArr.forEach(word =>
    {
      if(map.hasOwnProperty(word))
      {
         map[word]++;
      }
      else
      {
         map[word] = 1;
      }
    });
   const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
   frequencyArr.sort((a, b) => b[1] - a[1]);
   return frequencyArr.slice(0, num).map(el => el[0]);

  };
  //To samo dla waluty
  let str2 = subarraycurrencieslist.toString();
  const num2 = 5;
  const findMostFrequentCurrency = (subarraycurrencieslist, num2) => {
  const strArr2 = str2.split(',');
  const map2 = {};
  strArr2.forEach(word =>
  {
    if(map2.hasOwnProperty(word))
    {
      map2[word]++;
    }
    else
    {
      map2[word] = 1;
    }
  });
   const frequencyArr = Object.keys(map2).map(key => [key, map2[key]]);
   frequencyArr.sort((a, b) => b[1] - a[1]);
   return frequencyArr.slice(0, num).map(el => el[0]);
  };

  /* Wypisanie w oknie przeglądarki wraz z dzieleniem przez array.lenght (równie dobrze zadziała liczba 250, ale w przypadku zmian w arrayu jak np. usuniecie kraju
  zniszczy wynik obliczeń, bardziej sensownym jest więc użycie array.lenght)*/
  countriesEl.innerHTML = 
  `<div class="countriesEl">
     Number of countries on earth: ${ilosckrajow}</br>
     Number of countries on earth: ${array.length}</br>
     5 Most common languages are: ${findMostFrequent(str, num)}</br>          
     5 Most common Currencies are: ${findMostFrequentCurrency(str2, num2)}</br>
     Average number of neigbours: ${countriescount/array.length}</br>
     Average number of people in a country: ${popcount/array.length}</br>
     Average area for a country: ${avgarea/array.length} quare km</br>
  </div>`

  const hiddenElement = document.getElementById('hidden')
  hiddenElement.innerHTML = ``
}


