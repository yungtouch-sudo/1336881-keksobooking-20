'use strict';
(function () {
  window.activateMap = function () {
    window.map.classList.remove('map--faded');

    var mapFilters = document.querySelector('.map__filters');
    mapFilters.classList.remove('map__filters--disabled');
    var mapFiltersInputSelect = mapFilters.querySelectorAll('input, select');
    for (var k = 0; k < mapFiltersInputSelect.length; k += 1) {
      mapFiltersInputSelect[k].removeAttribute('disabled');
    }
  };
  window.deactivateMap = function () {
    window.map.classList.add('map--faded');

    var mapFilters = document.querySelector('.map__filters');
    mapFilters.classList.add('map__filters--disabled');
    var mapFiltersInputSelect = mapFilters.querySelectorAll('input, select');
    for (var k = 0; k < mapFiltersInputSelect.length; k += 1) {
      mapFiltersInputSelect[k].setAttribute('disabled', 'disabled');
    }
    var oldPins = document.querySelectorAll('.map__pin[type="button"]');
    for (var i = 0; i < oldPins.length; i += 1) {
      oldPins[i].remove();
    }
  };
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('input', window.roomCapacity);
  capacity.addEventListener('input', window.roomCapacity);

  window.popupClose = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };
  window.renderPin = function (pinData) {
    var pin = window.pinTemplate.cloneNode(true);
    pin.style.left = pinData.location.x + 'px';
    pin.style.top = pinData.location.y + 'px';

    pin.addEventListener('click', function () {
      window.popupClose();
      window.renderCard(window.createCard(pinData));
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.popupClose();
        window.renderCard(window.createCard(pinData));
      }
    });

    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = pinData.author.avatar;
    pinAvatar.alt = pinData.offer.title;

    return pin;

  };

  var applyFilters = function (cards) {
    var keys = Object.keys(window.filters);
    var result = cards;
    for (var i = 0; i < keys.length; i += 1) {
      result = window.filters[keys[i]].callback(cards, window.filters[keys[i]].value);
    }
    return result;
  };

  window.drawMap = function (cards) {
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
  var mapPinMove = false;
  var mapGlobal = document.querySelector('.map');
  mapGlobal.addEventListener('mousemove', function (evt) {
    if (mapPinMove) {
      window.mainPin.style.top = (evt.pageY - mapGlobal.offsetTop - 32) + 'px';
      window.mainPin.style.left = (evt.pageX - mapGlobal.offsetLeft - 32) + 'px';
    }
  });
  window.mainPin.addEventListener('mousedown', function () {
    mapPinMove = true;
  });
  window.mainPin.addEventListener('mouseup', function (evt) {
    mapPinMove = false;
    window.setAdress(evt.target.offsetTop - 75, evt.target.offsetLeft - 32);
  });

  window.resetMapPin = function () {
    window.mainPin.style.top = 375 + 'px';
    window.mainPin.style.left = 570 + 'px';
  };
})();

