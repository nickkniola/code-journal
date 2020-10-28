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
  viewSwapper('profile');
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
  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'container');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  containerDiv.appendChild(rowDiv);

  var columnFullDiv = document.createElement('div');
  columnFullDiv.setAttribute('class', 'column-full');
  rowDiv.appendChild(columnFullDiv);

  var h2Element = document.createElement('h2');
  h2Element.setAttribute('class', 'view-name-title');
  h2Element.textContent = data.profile.fullName;
  columnFullDiv.appendChild(h2Element);

  var rowDiv2 = document.createElement('div');
  rowDiv2.setAttribute('class', 'row user-view');
  containerDiv.appendChild(rowDiv2);

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
  h4Element.textContent = ' ' + data.profile.username;
  columnHalfDiv2.appendChild(h4Element);
  var icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-user');
  h4Element.prepend(icon);

  var h4Element2 = document.createElement('h4');
  h4Element2.setAttribute('class', 'view-location');
  h4Element2.textContent = ' ' + data.profile.location;
  columnHalfDiv2.append(h4Element2);
  var icon2 = document.createElement('i');
  icon2.setAttribute('class', 'fas fa-map-marker-alt');
  h4Element2.prepend(icon2);

  var pElement = document.createElement('p');
  pElement.setAttribute('class', 'view-profile-bio');
  pElement.textContent = data.profile.bio;
  columnHalfDiv2.appendChild(pElement);

  var aElement = document.createElement('a');
  aElement.setAttribute('href', '#');
  aElement.setAttribute('data-view', 'edit-profile');
  aElement.textContent = 'EDIT PROFILE';
  columnHalfDiv2.appendChild(aElement);

  return containerDiv;
}

var editProfileDiv = document.querySelector('div[data-view = "edit-profile"]');

var profileDiv = document.querySelector('div[data-view = "profile"]');


function viewSwapper(view) {
  if (view === 'profile') {
    var containerDiv = document.querySelector('div[data-view = "profile"] div.container');
    if (containerDiv) {
      containerDiv.remove();
    }
    editProfileDiv.setAttribute('class', 'display-none');
    profileDiv.setAttribute('class', 'display-block');
    data.view = 'profile';
    profileDiv.appendChild(renderProfile(data));
  } else if (view === 'edit-profile') {
    editProfileDiv.setAttribute('class', 'display-block');
    profileDiv.setAttribute('class', 'display-none');
    data.view = 'edit-profile';
    if (data.profile.avatarUrl) {
      prepopulateForm();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (data.profile.username) {
    viewSwapper('profile');
  } else {
    viewSwapper('edit-profile');
  }
})

function prepopulateForm() {
  avatarImage.setAttribute('src', data.profile.avatarUrl);
  profileForm.elements.avatarUrl.value = data.profile.avatarUrl;
  profileForm.elements.username.value = data.profile.username;
  profileForm.elements.fullName.value = data.profile.fullName;
  profileForm.elements.location.value = data.profile.location;
  profileForm.elements.bio.value = data.profile.bio;
}

document.addEventListener('click', function (event) {
  if (!event.target.matches('a')) {
    return;
  }
  if (event.target.matches('a[data-view = "edit-profile"]')) {
    viewSwapper('edit-profile');
  }
  if (event.target.matches('a[data-view = "profile"]') && data.profile.username) {
    viewSwapper('profile');
  }
})
