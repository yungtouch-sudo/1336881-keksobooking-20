'use strict';
(function () {
  var loadUrl = 'https://javascript.pages.academy/keksobooking/data';
  var showError = function (message, againCb) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorMessage.querySelector('.error__message').innerText = message;
    window.map.appendChild(errorMessage);
    errorMessage.addEventListener('click', function () {
      errorMessage.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorMessage.remove();
      }
    });
    errorMessage.querySelector('.error__button').addEventListener('click', function () {
      errorMessage.remove();
      againCb();
    });
  };

  var onLoadSuccess = function (data) {
    window.offers = data;
    window.drawMap(data);
  };

  var onLoadError = function (error) {
    showError(error, function () {
      window.load(loadUrl, onLoadSuccess, onLoadError);
    });
  };

  function activate() {
    window.activateMap();
    window.activateForm();
    window.adress();
    if (window.offers.length === 0) {
      window.load(loadUrl, onLoadSuccess, onLoadError);
    } else {
      window.drawMap(window.offers);
    }
  }

  function deactivate() {
    window.deactivateMap();
    window.deactivateForm();
    window.resetMapPin();
    window.adress();
    window.resetImg();
    window.popupClose();
    document.querySelector('.map__filters').reset();
    window.filters = {};
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

  var onPostError = function (error) {
    showError(error, function () {
      window.upload(new FormData(window.form), onPostSuccess, onPostError);
    });
  };

  var onSubmit = function (evt) {
    window.upload(new FormData(window.form), onPostSuccess, onPostError);
    evt.preventDefault();
  };
  window.form.addEventListener('input', function () {
    window.roomCheck();
    window.titleLengthCheck();
    window.priceLengthCheck();
    window.typeCheck();
  });
  window.form.addEventListener('submit', onSubmit);

  var typeHouse = document.querySelector('#type');
  typeHouse.addEventListener('input', function () {
    window.setPriceLimit();
  });


  var addFilter = function (name, callback, value) {
    window.filters[name] = {callback: callback, value: value};
    window.popupClose();
    window.debounce(function () {
      window.drawMap(window.offers);
    })();
  };

  window.mainPin.addEventListener('mousedown', function () {
    activate();
  });
  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Tab') {
      activate();
    }
  });

  var typeInput = document.querySelector('#housing-type');
  typeInput.addEventListener('input', function (evt) {
    addFilter('typeFilter', window.filterType, evt.target.value);
  });
  var priceInput = document.querySelector('#housing-price');
  priceInput.addEventListener('input', function (evt) {
    addFilter('priceFilter', window.filterPrice, evt.target.value);
  });

  var roomsInput = document.querySelector('#housing-rooms');
  roomsInput.addEventListener('input', function (evt) {
    addFilter('roomsFilter', window.filterRooms, evt.target.value);
  });

  var guestsInput = document.querySelector('#housing-guests');
  guestsInput.addEventListener('input', function (evt) {
    addFilter('guestsFilter', window.filterGuests, evt.target.value);
  });

  var housingInput = document.querySelector('#housing-features');
  housingInput.addEventListener('input', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      var feature = evt.target.checked ? evt.target.value : false;
      addFilter('filter' + evt.target.value, window.filterFeatures, feature);
    }
  });

  var titleInput = document.querySelector('#title');
  titleInput.addEventListener('input', function () {
    window.titleLengthCheck();
  });

  window.resetMap.addEventListener('click', function () {
    deactivate();
  });
  window.adress();
  deactivate();
})();

