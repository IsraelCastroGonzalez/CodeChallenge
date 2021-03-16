const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const submitBtn = document.getElementById('submit-btn');
const countriesContainer = document.getElementById('countries-container');

//Request and filter
const suggestCountries = async searchText => {
    //Verify that we have more than 3 characters
    if(search.value.length > 3){
        const res = await fetch('https://restcountries.eu/rest/v2/name/'+search.value+'?fields=name;alpha3Code');
        const countries = await res.json();        
        //console.log(countries);
        if(res.ok){
          outputHTML(countries);
        }
        else{
          matchList.innerHTML = '';
          let div = document.createElement("div");
          div.setAttribute("id","no-match");
          div.setAttribute("class", "list-item");
          
          let h5 = document.createElement("h5");
          h5.innerHTML = "No match found.";
          h5.setAttribute("class", "text-danger");
          div.appendChild(h5);
          matchList.append(div);
        }
        
    }else{
        matchList.innerHTML = '';
    }
}

const outputHTML = countries =>{
  matchList.innerHTML = '';
  if(countries.length > 0){
    countries.forEach(country => {
      let div = document.createElement("div");
      div.setAttribute("id","list-item");
      div.setAttribute("class", "list-item");
      
      let h5 = document.createElement("h5");
      h5.innerHTML = country.name;
      div.appendChild(h5);
      
      let p = document.createElement("p");
      p.innerHTML = country.alpha3Code;
      p.setAttribute("class", "text-primary");
      div.appendChild(p);
      
      div.innerHTML += "<input type='hidden' value='" + country.name + "'>";

      div.addEventListener("click", function(e) {
        search.value = this.getElementsByTagName("input")[0].value;
        matchList.innerHTML = '';
      });
      matchList.append(div);
    });
  }
}
search.addEventListener('input',()=> suggestCountries(search.value));

const searchCountries = async searchText => {
  matchList.innerHTML = '';
  countriesContainer.innerHTML = '';
  const res = await fetch('https://restcountries.eu/rest/v2/name/'+search.value+'?fields=name;region;currencies;languages;population');
  const countries = await res.json();        
  if(res.ok){
    countries.forEach(country => {
      let col = document.createElement("div");
      col.setAttribute("class","col");
      
      let card = document.createElement("div");
      card.setAttribute("class", "card text-white bg-secondary mb-3");

      let header = document.createElement("div");
      header.setAttribute("class", "card-header");
      header.innerHTML = 'Region: ' + country.region + " ";
      header.appendChild(setGlobeIcon(country.region))
      //TODO: add matching globe icon
      card.appendChild(header);
      
      let body = document.createElement("div");
      body.setAttribute("class", "card-body");

      let h4 = document.createElement("h4");
      h4.innerHTML = country.name;
      body.appendChild(h4);

      let cardTextPop = document.createElement("p");
      cardTextPop.setAttribute("class", "card-text");
      cardTextPop.innerHTML = "<i class='fas fa-user'></i> Population: <span class='text-success'>" + country.population + "</span>";
      body.appendChild(cardTextPop);
      
      let cardTextCoin = document.createElement("p");
      cardTextCoin.setAttribute("class", "card-text");
      cardTextCoin.innerHTML = "<i class='far fa-money-bill-alt'></i> Currencies: " + displayCurrencies(country.currencies);
      body.appendChild(cardTextCoin);

      let cardTextLang = document.createElement("p");
      cardTextLang.setAttribute("class", "card-text");
      cardTextLang.innerHTML = "<i class='fas fa-language'></i> Languages: " +  displayLanguages(country.languages);
      body.appendChild(cardTextLang);
      
      card.appendChild(body);
      col.appendChild(card);

      col.innerHTML += "<input type='hidden' value='" + country.name + "'>";
      countriesContainer.append(col);
    });
  }  
}

function displayCurrencies(currenciesArray){
  let currenciesDOM = "";
  currenciesArray.forEach(function(currency, idx, array){
    if (idx === array.length - 1){ 
      currenciesDOM += currency.name + '.</br>';
    }
    else{
      currenciesDOM += currency.name + ', ';
    }
  });
  return currenciesDOM;
}

function displayLanguages(languagesArray){
  let languagesDOM = "";
  languagesArray.forEach(function(language, idx, array){
    if (idx === array.length - 1){ 
      languagesDOM += language.name + '.</br>';
    }
    else{
      languagesDOM += language.name + ', ';
    }
  });

  return languagesDOM;
}

function setGlobeIcon(region){
  let globe = document.createElement("i");
  switch (region) {
    case "Americas":
      globe.setAttribute("class","fas fa-globe-americas text-info");
      break;
    case "Asia":
      globe.setAttribute("class","fas fa-globe-asia text-info");
      break;
    case "Africa":
      globe.setAttribute("class","fas fa-globe-africa text-info");
      break;
    case "Europe":
      globe.setAttribute("class","fas fa-globe-europe text-info");
      break;
    default:
      globe.setAttribute("class","fas fa-globe text-info");
      break;
  }
  return globe;
}

submitBtn.addEventListener('click',()=> searchCountries(search.value));
