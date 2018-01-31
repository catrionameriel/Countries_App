var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var createInitialList = function(the_country){
  var ul = document.querySelector('#country-list');

  var li = document.createElement("li");
  li.innerText = the_country.name;
  li.setAttribute("id", "name-of-the-country");

  var li2 = document.createElement("li");
  li2.innerText = the_country.population;
  li2.setAttribute("id", "population-of-the-country");

  var li3 = document.createElement("li");
  li3.innerText = the_country.capital;
  li3.setAttribute("id", "capital-of-the-country");

  ul.appendChild(li);
  ul.appendChild(li2);
  ul.appendChild(li3);

  var jsonString = JSON.stringify(the_country);
  localStorage.setItem('country', jsonString);
}

var changeListContent = function(the_country){
  var nameLi = document.querySelector('#name-of-the-country');
  var populationLi = document.querySelector('#population-of-the-country');
  var capitalLi = document.querySelector('#capital-of-the-country');

  nameLi.innerText = the_country.name;
  populationLi.innerText = the_country.population;
  capitalLi.innerText = the_country.capital;

  var jsonString = JSON.stringify(the_country);
  localStorage.setItem('country', jsonString);
}

var setUpListener = function(countries){
  var dropDown = document.querySelector('#country-dropdown');

  dropDown.addEventListener('change', function(){

    var listContent = document.querySelector('#country-list').getElementsByTagName('li');
    var the_country = null;
    for (country of countries){
      if (this.value === country.name){ var the_country = country;}}
      if (listContent.length === 0) { createInitialList(the_country);}
      else { changeListContent(the_country);}
    });}

  var requestComplete = function(){
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var countries = JSON.parse(jsonString);
    populateDropdown(countries)
    setUpListener(countries)
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
