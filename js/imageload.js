'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageSize = 70;
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onLoadimage = function (fileImageChooser, previewImageUsers) {
    var file = fileImageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      fileImageChooser.setCustomValidity('');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('width', imageSize);
        img.setAttribute('height', imageSize);
        previewImageUsers.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      fileImageChooser.setCustomValidity('Не верный формат изображения');
    }
  };
  avatarChooser.addEventListener('change', function () {
    onLoadimage(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    onLoadimage(photoChooser, photoPreview);
  });
})();
