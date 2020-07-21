'use strict';
(function () {
  var MAX_RENDER_CARD = 5;
  window.OFFSET_TO_CENTER_PIN = 32;
  window.OFFSET_TO_BOTTOM_PIN = 75;
  var DEFAULT_PIN_X = 570;
  var DEFAULT_PIN_Y = 375;
  var MAP_BORDER_TOP = 130;
  var MAP_BORDER_BOTTOM = 630;
  var MAP_BORDER_LEFT = 0;
  var MAP_BORDER_RIGHT = 1200;
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

  roomNumber.addEventListener('input', function () {
    window.roomCapacity();
  });
  capacity.addEventListener('input', function () {
    window.roomCapacity();
  });

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
      result = window.filters[keys[i]].callback(result, window.filters[keys[i]].value);
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
    for (var j = 0; j < MAX_RENDER_CARD && j < filterCards.length; j++) {
      fragment.appendChild(window.renderPin(filterCards[j]));
    }
    window.map.appendChild(fragment);
  };
  var mapPinMove = false;
  var mapGlobal = document.querySelector('.map');
  window.addEventListener('mousemove', function (evt) {
    if (mapPinMove) {
      var newY = evt.pageY - mapGlobal.offsetTop - window.OFFSET_TO_BOTTOM_PIN;
      var newX = evt.pageX - mapGlobal.offsetLeft - window.OFFSET_TO_CENTER_PIN;
      if (newY >= MAP_BORDER_TOP && newY <= MAP_BORDER_BOTTOM) {
        window.mainPin.style.top = newY + 'px';
      } else {
        if (newY < MAP_BORDER_TOP) {
          window.mainPin.style.top = (MAP_BORDER_TOP) + 'px';
        }
        if (newY > MAP_BORDER_BOTTOM) {
          window.mainPin.style.top = (MAP_BORDER_BOTTOM) + 'px';
        }
      }

      if (newX >= MAP_BORDER_LEFT && newX <= MAP_BORDER_RIGHT) {
        window.mainPin.style.left = newX + 'px';
      } else {
        if (newX < MAP_BORDER_LEFT) {
          window.mainPin.style.left = (MAP_BORDER_LEFT - window.OFFSET_TO_CENTER_PIN) + 'px';
        }
        if (newX > MAP_BORDER_RIGHT) {
          window.mainPin.style.left = (MAP_BORDER_RIGHT - window.OFFSET_TO_CENTER_PIN) + 'px';
        }
      }
      window.adress(evt.target.offsetTop - window.OFFSET_TO_BOTTOM_PIN, evt.target.offsetLeft);
    }
  });
  window.mainPin.addEventListener('mousedown', function () {
    mapPinMove = true;
  });
  window.addEventListener('mouseup', function () {
    mapPinMove = false;
  });

  window.resetMapPin = function () {
    window.mainPin.style.top = DEFAULT_PIN_Y + 'px';
    window.mainPin.style.left = DEFAULT_PIN_X + 'px';
  };
})();

