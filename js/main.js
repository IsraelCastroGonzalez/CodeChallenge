const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const submitBtn = document.getElementById('submit-btn');

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

