'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileImageChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewImageUsers = document.querySelector('.ad-form-header__preview img');

  fileImageChooser.addEventListener('change', function () {
    var file = fileImageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImageUsers.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
