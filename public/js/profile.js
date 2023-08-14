const newFormHandler = async (event) => {
  event.preventDefault();

  const location = document.querySelector('#post-location').value.trim();
  const text = document.querySelector('#post-desc').value.trim();
  var animalID = "";
  function getID(id) {
    animalID = id
    console.log(animalID);
  }



  if (location && text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, text, animalID}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

var animalID = "";
function getID(id) {
animalID = id
console.log(animalID);
}


document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);






