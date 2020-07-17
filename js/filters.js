'use strict';
(function () {
  var priceLimits = {
    low: {max: '10000'},
    middle: {min: '10000', max: '50000'},
    high: {min: '50000'}
  };
  var guests = {
    one: '1',
    two: '2',
    three: '3'
  };
  var rooms = {
    one: '1',
    two: '2',
    three: '3',
    many: '100'
  };

  window.filterType = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (value === cards[i].offer.type) {
        results.push(cards[i]);
      }
    }
    return results;
  };
  window.filterPrice = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === 'middle') {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.price >= priceLimits.middle.min && cards[k].offer.price <= priceLimits.middle.max) {
          results.push(cards[k]);
        }
      }
    }

    if (value === 'low') {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.price < priceLimits.low.max) {
          results.push(cards[i]);
        }
      }
    }

    if (value === 'high') {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.price > priceLimits.high.min) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };


  window.filterRooms = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === rooms.one) {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.rooms >= rooms.one && cards[i].offer.rooms <= rooms.one) {
          results.push(cards[i]);
        }
      }
    }

    if (value === rooms.two) {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.rooms >= rooms.two && cards[k].offer.rooms <= rooms.two) {
          results.push(cards[k]);
        }
      }
    }

    if (value === rooms.three) {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.rooms >= rooms.three && cards[j].offer.rooms <= rooms.three) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };


  window.filterGuests = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === guests.one) {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.guests >= guests.one && cards[k].offer.guests <= guests.one) {
          results.push(cards[k]);
        }
      }
    }

    if (value === guests.two) {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.guests >= guests.two && cards[i].offer.guests <= guests.two) {
          results.push(cards[i]);
        }
      }
    }

    if (value === guests.three) {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.guests >= guests.many && cards[j].offer.guests <= guests.many) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };

  window.filterFeatures = function (cards, value) {
    if (value === false) {
      return cards;
    }
    var results = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (cards[i].offer.features.includes(value)) {
        results.push(cards[i]);
      }
    }
    return results;
  };

})();

