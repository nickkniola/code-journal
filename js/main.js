var avatarInput = document.querySelector('.avatar-input');
var avatarImage = document.querySelector('.img-col img')

avatarInput.addEventListener('input', function (event) {
  avatarImage.setAttribute('src', avatarInput.value)
})
