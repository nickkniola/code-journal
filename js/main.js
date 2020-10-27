var avatarInput = document.querySelector('.avatar-input');
var avatarImage = document.querySelector('.img-col img');

avatarInput.addEventListener('input', function () {
  avatarImage.setAttribute('src', avatarInput.value)
});

var profileForm = document.querySelector('.edit-profile-form');

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();

  data.profile.avatarUrl = profileForm.elements.avatarUrl.value;
  data.profile.username = profileForm.elements.username.value;
  data.profile.fullName = profileForm.elements.fullName.value;
  data.profile.location = profileForm.elements.location.value;
  data.profile.bio = profileForm.elements.bio.value;

  profileForm.reset();
  avatarImage.setAttribute('src', 'images/placeholder-image-square.jpg');
});

var previousProfileData = localStorage.getItem('profileData');

if (previousProfileData) {
  data = JSON.parse(previousProfileData)
}

window.addEventListener('beforeunload', function () {
  var dataString = JSON.stringify(data);
  localStorage.setItem('profileData', dataString);
});
