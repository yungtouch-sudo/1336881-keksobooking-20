'use strict';

var onLoadSuccess = function (data) {
  window.offers = data;
  window.drawMap(data);
};

var onLoadError = function () {
  return true;
};

function activate() {
  window.activateMap();
  window.activateForm();
  window.setAdress();
  window.load('https://javascript.pages.academy/keksobooking/data', onLoadSuccess, onLoadError);
}

function deactivate() {
  window.deactivateMap();
  window.deactivateForm();
}

var onPostSuccess = function () {
  deactivate();
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  window.map.appendChild(successMessage);
  successMessage.addEventListener('click', function () {
    successMessage.remove();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });
};

var submitHandler = function (evt) {
  window.upload(new FormData(window.form), onPostSuccess);
  evt.preventDefault();
};
window.form.addEventListener('submit', submitHandler);

var addFilter = function (name, callback, value) {
  window.filters[name] = {callback: callback, value: value};
};

window.mainPin.addEventListener('click', activate);
window.mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Tab') {
    activate();
  }
});

var typeInput = document.querySelector('#housing-type');
typeInput.addEventListener('input', function (evt) {
  addFilter('typeFilter', window.filterType, evt.target.value);
  window.drawMap(window.offers);
});
var priceInput = document.querySelector('#housing-price');
priceInput.addEventListener('input', function (evt) {
  addFilter('priceFilter', window.filterPrice, evt.target.value);
  window.drawMap(window.offers);
});

var roomsInput = document.querySelector('#housing-rooms');
roomsInput.addEventListener('input', function (evt) {
  addFilter('roomsFilter', window.filterRooms, evt.target.value);
  window.drawMap(window.offers);
});

var guestsInput = document.querySelector('#housing-guests');
guestsInput.addEventListener('input', function (evt) {
  addFilter('guestsFilter', window.filterGuests, evt.target.value);
  window.drawMap(window.offers);
});

var housingInput = document.querySelector('#housing-features');
housingInput.addEventListener('input', function (evt) {
  if (evt.target.tagName === 'INPUT') {
    var feature = evt.target.checked ? evt.target.value : false;
    addFilter('filter' + evt.target.value, window.filterFeatures, feature);
    window.drawMap(window.offers);
  }
});

var titleInput = document.querySelector('#title');
titleInput.addEventListener('input', window.titleLength);


