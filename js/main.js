'use strict';

window.map = document.querySelector('.map');
var offersList = window.getOffersList();



window.renderCard(window.createCard(offersList[0]));

var modalCard = document.querySelector('.popup__close');
modalCard.addEventListener('click', window.closeModal);
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape'){
    window.closeModal();
  }
});

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt){
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

//var adForm = document.querySelector('.ad-form');

// adForm.addEventListener('submit', roomCapacity);

roomNumber.addEventListener('input', window.roomCapacity);
capacity.addEventListener('input', window.roomCapacity);


(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(window.renderPin(data[j]));
    }
    window.map.appendChild(fragment);
  };

  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
})();
