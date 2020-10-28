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

function renderProfile(data) {
  var profileDiv = document.createElement('div');
  profileDiv.setAttribute('data-view', 'profile');

  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'container');
  profileDiv.appendChild(containerDiv);

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  containerDiv.appendChild(rowDiv);

  var columnFullDiv = document.createElement('div');
  columnFullDiv.setAttribute('class', 'column-full');
  rowDiv.appendChild(columnFullDiv);

  var h2Element = document.createElement('div');
  h2Element.setAttribute('class', 'view-name-title');
  h2Element.textContent = data.profile.fullName;
  columnFullDiv.appendChild(h2Element);

  var rowDiv2 = document.createElement('div');
  rowDiv2.setAttribute('class', 'row user-view');
  profileDiv.appendChild(rowDiv2);

  var columnHalfDiv = document.createElement('div');
  columnHalfDiv.setAttribute('class', 'column-half');
  rowDiv2.appendChild(columnHalfDiv);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', data.profile.avatarUrl);
  imgElement.setAttribute('alt', 'user profile');
  imgElement.setAttribute('class', 'profile-image');
  columnHalfDiv.appendChild(imgElement);

  var columnHalfDiv2 = document.createElement('div');
  columnHalfDiv2.setAttribute('class', 'column-half');
  rowDiv2.appendChild(columnHalfDiv2);

  var h4Element = document.createElement('h4');
  h4Element.setAttribute('class', 'view-user-id');
  var icon = document.createElement(i);
  icon.setAttribute('class', 'fas fa-user');
  h4Element.appendChild(icon);
  h4Element.textContent = data.profile.username;
  columnHalfDiv2.appendChild(h4Element);

  var h4Element2 = document.createElement('h4');
  h4Element2.setAttribute('class', 'view-location');
  var icon2 = document.createElement(i);
  icon2.setAttribute('class', 'fas fa-map-marker-alt');
  h4Element2.appendChild(icon2);
  h4Element2.textContent = data.profile.location;
  columnHalfDiv2.append(h4Element2);

  var pElement = document.createElement('p');
  pElement.setAttribute('class', 'view-profile-bio');
  pElement.textContent = data.profile.bio;
  columnHalfDiv2.append(pElement);

  return profileDiv;
}

var editProfileDiv = document.querySelector('div[data-view = "edit-profile"]');

var profileDiv = document.querySelector('div[data-view = "profile"]');

function viewSwapper() {
  if (data.view === "edit-profile") {
    editProfileDiv.setAttribute('class', 'display-block');
    profileDiv.setAttribute('class', 'display-none');
  } else {
    editProfileDiv.setAttribute('class', 'display-none');
    profileDiv.setAttribute('class', 'display-block');
  }
}
