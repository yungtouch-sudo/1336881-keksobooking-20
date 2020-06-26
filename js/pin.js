'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.renderPin = function (pinData) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = pinData.location.x + 'px';
    pin.style.top = pinData.location.y + 'px';

    pin.addEventListener('click', function () {
      popupClose();
      window.renderCard(window.createCard(pinData));
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        popupClose();
        window.renderCard(window.createCard(pinData));
      }
    });

    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = pinData.author.avatar;
    pinAvatar.alt = pinData.offer.title;

    return pin;

  };

  var popupClose = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();
  };

  window.closeModal = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();
  };
})();
