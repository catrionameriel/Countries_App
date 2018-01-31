var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropdown(countries);

  var dropDown = document.querySelector('#country-dropdown');

  dropDown.addEventListener('change', function() {
    var the_country = null;
    for (country of countries){
      console.log(country);
      if (this.value === country.name){
        var the_country = country;
      }
    }

    var ul = document.querySelector('#country-list');

    var li = document.createElement("li");
    li.innerText = the_country.name;

    var li2 = document.createElement("li");
    li2.innerText = the_country.population;

    var li3 = document.createElement("li");
    li3.innerText = the_country.capital;

    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
  });
}

var populateDropdown = function(countries) {
  var dropDown = document.querySelector('#country-dropdown');
  countries.forEach(function(country) {
    var option = document.createElement('option');
    option.innerText = country.name;
    option.setAttribute("value", country.name);
    dropDown.appendChild(option);
  })
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
