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

var photoInput = document.querySelector('.entry-input.url');
var photo = document.querySelector('.new-entry-image');
photoInput.addEventListener('input', function () {
  photo.setAttribute('src', photoInput.value);
});

var previousProfileData = localStorage.getItem('profileData');

if (previousProfileData) {
  data = JSON.parse(previousProfileData)
}

window.addEventListener('beforeunload', function () {
  if (!data.profile.username) {
    return;
  }

  var dataString = JSON.stringify(data);
  localStorage.setItem('profileData', dataString);
});

function renderProfile() {
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

var editProfileDiv = document.querySelector('div[data-view="edit-profile"]');
var profileDiv = document.querySelector('div[data-view="profile"]');
var entriesDiv = document.querySelector('div[data-view="entries"]');
var createEntryDiv = document.querySelector('div[data-view="create-entry"]')

function viewSwapper(view) {
  if (view === 'profile') {
    var containerDiv = document.querySelector('div[data-view = "profile"] div.container');
    if (containerDiv) {
      containerDiv.remove();
    }
    profileDiv.setAttribute('class', 'display-block');
    editProfileDiv.setAttribute('class', 'display-none');
    entriesDiv.setAttribute('class', 'display-none');
    createEntryDiv.setAttribute('class', 'display-none');
    data.view = 'profile';
    profileDiv.appendChild(renderProfile());
  } else if (view === 'edit-profile') {
    editProfileDiv.setAttribute('class', 'display-block');
    entriesDiv.setAttribute('class', 'display-none');
    profileDiv.setAttribute('class', 'display-none');
    createEntryDiv.setAttribute('class', 'display-none');
    data.view = 'edit-profile';
    if (data.profile.avatarUrl) {
      prepopulateForm();
    }
  } else if (view === 'entries') {
    entriesDiv.setAttribute('class', 'display-block');
    editProfileDiv.setAttribute('class', 'display-none');
    profileDiv.setAttribute('class', 'display-none');
    createEntryDiv.setAttribute('class', 'display-none');
    data.view = 'entries';
  } else if (view === 'create-entry') {
    createEntryDiv.setAttribute('class', 'display-block');
    entriesDiv.setAttribute('class', 'display-none');
    editProfileDiv.setAttribute('class', 'display-none');
    profileDiv.setAttribute('class', 'display-none');
    data.view = 'create-entry';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (data.profile.username) {
    viewSwapper('profile');
  } else {
    viewSwapper('edit-profile');
  }
  renderAllEntries();
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
  if (event.target.matches('a[data-view="edit-profile"]')) {
    viewSwapper('edit-profile');
  } else if (event.target.matches('a[data-view="profile"]') && data.profile.username) {
    viewSwapper('profile');
  } else if (event.target.matches('a[data-view="entries"]') && data.profile.username) {
    viewSwapper('entries');
  } else if (event.target.matches('a[data-view="create-entry"]') && data.profile.username) {
    viewSwapper('create-entry');
  }

  if (event.target.matches('a[data-view="delete-entry"]')) {
    var orderedList = document.querySelector('ol');
    orderedList.removeChild(event.target.closest('li'));
    // remove specific entry to delete from localStorage
    for (var i = 0; i < data.entries.length; i++) {
      if (event.target.previousSibling.textContent === data.entries[i].notes) {
        data.entries.splice(i, 1);
      }
    }

    var dataString = JSON.stringify(data);
    localStorage.setItem('profileData', dataString);
  }
})

var newEntryForm = document.querySelector('.new-entry-form');

newEntryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var entryObject = {};
  entryObject.url = newEntryForm.elements.photoUrl.value;
  entryObject.title = newEntryForm.elements.title.value;
  entryObject.notes = newEntryForm.elements.notes.value;
  data.entries.push(entryObject);

  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  newEntryForm.reset();
  viewSwapper('entries');

  renderOneEntry()
});

function renderEntry(entry) {
  var li = document.createElement('li');

  var row = document.createElement('div');
  row.setAttribute('class', 'row new-entry');
  li.appendChild(row);

  var col = document.createElement('div');
  col.setAttribute('class', 'column-half');
  row.appendChild(col);

  var img = document.createElement('img');
  img.setAttribute('src', entry.url);
  img.setAttribute('alt', entry.title);
  img.setAttribute('class', 'entry-image');
  col.appendChild(img);

  col2 = document.createElement('div');
  col2.setAttribute('class', 'column-half');
  row.appendChild(col2);

  h4Element = document.createElement('h4');
  h4Element.setAttribute('class', 'entry-header');
  h4Element.textContent = entry.title;
  col2.appendChild(h4Element);

  pElement = document.createElement('p');
  pElement.textContent = entry.notes;
  col2.appendChild(pElement);

  var deleteLink = document.createElement('a');
  deleteLink.setAttribute('href', '#');
  deleteLink.setAttribute('class', 'delete-link');
  deleteLink.setAttribute('data-view', 'delete-entry');
  deleteLink.textContent = 'DELETE';
  col2.appendChild(deleteLink);

  return li;
}

var olEntries = document.querySelector('ol');

function renderAllEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    olEntries.appendChild(renderEntry(data.entries[i]));
  }
}

function renderOneEntry() {
  olEntries.appendChild(renderEntry(data.entries[data.entries.length - 1]));
}
