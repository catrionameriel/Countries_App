var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var clickToReveal = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
}

var populateList = function(countries){
  var ul = document.querySelector('#country-list');

  countries.forEach(function(country){
    var li = document.createElement("li");
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

var populateOptions = function(countries){
  var select = document.querySelector("#country-dropdown");



}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}

var app = function(){
  var button = document.querySelector('#reveal-button');
  button.addEventListener('click', clickToReveal);
}

window.addEventListener('load', app);
