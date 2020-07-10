'use strict';

window.map = document.querySelector('.map');
var offersList = window.getOffersList();


window.renderCard(window.createCard(offersList[0]));

var modalCard = document.querySelector('.popup__close');
modalCard.addEventListener('click', window.closeModal);
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    window.closeModal();
  }
});

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    window.activateMap();
  }
});
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Tab') {
    window.activateMap();
    window.setAdres();
  }
});

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

roomNumber.addEventListener('input', window.roomCapacity);
capacity.addEventListener('input', window.roomCapacity);


(function () {
  var onError = function () {
    return true;
  };
  var typeInput = document.querySelector('#housing-type');
  typeInput.addEventListener('input', function (evt) {
    addFilter('typeFilter', window.filterType, evt.target.value);
    drawMap(offers);
  });
  var priceInput = document.querySelector('#housing-price');
  priceInput.addEventListener('input', function (evt) {
    addFilter('priceFilter', window.filterPrice, evt.target.value);
    drawMap(offers);
  });


  var roomsInput = document.querySelector('#housing-rooms');
  roomsInput.addEventListener('input', function (evt) {
    addFilter('roomsFilter', window.filterRooms, evt.target.value);
    drawMap(offers);
  });


  var guestsInput = document.querySelector('#housing-guests');
  guestsInput.addEventListener('input', function (evt) {
    addFilter('guestsFilter', window.filterGuests, evt.target.value);
    drawMap(offers);
  });

  var housingInput = document.querySelector('#housing-features');
  housingInput.addEventListener('input', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      var feature = evt.target.checked ? evt.target.value : false;
      addFilter('filter' + evt.target.value, window.filterFeatures, feature);
      drawMap(offers);
    }
  });


  var offers = [];
  var filters = {};
  var addFilter = function (name, callback, value) {
    filters[name] = {callback: callback, value: value};
  };
  var applyFilters = function (cards) {
    var keys = Object.keys(filters);
    var result = cards;
    for (var i = 0; i < keys.length; i += 1) {
      result = filters[keys[i]].callback(cards, filters[keys[i]].value);
    }
    return result;
  };
  var drawMap = function (cards) {
    var filterCards = applyFilters(cards);
    var fragment = document.createDocumentFragment();
    var oldPins = document.querySelectorAll('.map__pin[type="button"]');
    for (var i = 0; i < oldPins.length; i += 1) {
      oldPins[i].remove();
    }
    for (var j = 0; j < 5 && j < filterCards.length; j++) {
      fragment.appendChild(window.renderPin(filterCards[j]));
    }
    window.map.appendChild(fragment);
  };
  var onSuccess = function (data) {
    offers = data;
    drawMap(data);
  };
  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
  var titleInput = document.querySelector('#title');
  titleInput.addEventListener('input', window.titleLength);
  var onPostSuccess = function () {
    window.inActivateMap();
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

  var form = document.querySelector('.ad-form');
  var submitHandler = function (evt) {
    window.upload(new FormData(form), onPostSuccess);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

})();
