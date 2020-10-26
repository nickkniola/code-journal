var avatarInput = document.querySelector('.avatar-input');
var avatarImage = document.querySelector('.img-col img');

avatarInput.addEventListener('input', function () {
  avatarImage.setAttribute('src', avatarInput.value)
});

var form = document.querySelector('.profile-form');

form.addEventListener('submit', function () {

})
