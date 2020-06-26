'use strict';

(function () {
  window.activateMap = function () {
    window.map.classList.remove('map--faded');
    var addForm = document.querySelector('.ad-form');
    addForm.classList.remove('ad-form--disabled');
    var inputSelect = addForm.querySelectorAll('input, select');
    for (var i = 0; i < inputSelect.length; i += 1) {
      inputSelect[i].removeAttribute('disabled');
    }
    var mapFilters = document.querySelector('.map__filters');
    mapFilters.classList.remove('map__filters--disabled');
    var mapFiltersInputSelect = mapFilters.querySelectorAll('input, select');
    for (var k = 0; k < mapFiltersInputSelect.length; k += 1) {
      mapFiltersInputSelect[k].removeAttribute('disabled');
    }
  };
})();
