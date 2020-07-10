'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileImageChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewImageUsers = document.querySelector('.ad-form__photo');

  fileImageChooser.addEventListener('change', function () {
    var file = fileImageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('width', 70);
        img.setAttribute('height', 70);
        previewImageUsers.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  });
})();
