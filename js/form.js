'use strict';
(function () {
  window.setAdress = function () {
    var adresInput = document.querySelector('#address');
    adresInput.value = window.mainPin.offsetTop + ', ' + window.mainPin.offsetLeft;
  };

  window.activateForm = function () {
    var addForm = document.querySelector('.ad-form');
    addForm.classList.remove('ad-form--disabled');
    var inputSelect = addForm.querySelectorAll('input, select');
    for (var i = 0; i < inputSelect.length; i += 1) {
      inputSelect[i].removeAttribute('disabled');
    }
  };

  window.deactivateForm = function () {
    var addForm = document.querySelector('.ad-form');
    addForm.reset();
    addForm.classList.add('ad-form--disabled');
    var inputSelect = addForm.querySelectorAll('input, select');
    for (var i = 0; i < inputSelect.length; i += 1) {
      inputSelect[i].setAttribute('disabled', 'disabled');
    }
  };

  window.roomCapacityValidte = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    capacity.setCustomValidity('');
    roomNumber.setCustomValidity('');
    if (roomNumber.value === 100 && capacity.value !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
    }
    if (capacity.value > roomNumber.value) {
      capacity.setCustomValidity('число гостей не должно превышать число коммнат.');
      roomNumber.setCustomValidity('число гостей не должно превышать число коммнат.');
    }
  };

  window.titleLengthValidate = function () {
    var titleInput = document.querySelector('#title');
    titleInput.setCustomValidity('');
    if (titleInput.value.length < 30) {
      titleInput.setCustomValidity('Заголовок должен быть больше 30-ти символов!');
    }
  };


})();

