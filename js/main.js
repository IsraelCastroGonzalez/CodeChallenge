const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Request and filter
const searchCountries = async searchText => {
    //Verify that we have more than 3 characters
    if(search.value.length > 3){
        const res = await fetch('https://restcountries.eu/rest/v2/name/'+search.value+'?fields=name;capital;alpha3Code');
        const countries = await res.json();        
        //console.log(countries);
        outputHTML(countries);
    }else{
        matchList.innerHTML = '';
    }
}

const outputHTML = countries =>{
    if(countries.length > 0){
        const html = countries.map(country =>`
            <div class="card card-body card-body-hover mb-1">
                <h4>${country.name}</h4><span class="text-primary">${country.capital}</span>
                <small>${country.alpha3Code}</small>
            </div>
        `).join(''); // convert to pure txt

        matchList.innerHTML = html;
    }
} 

search.addEventListener('input',()=> searchCountries(search.value));        
