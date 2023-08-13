const updateButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const text = document.querySelector('#post-desc').value.trim();
  const id =  window.location.toString().split('/')[window.location.toString().split('/').length - 1]
  if (name && text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, text}),
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


const cancelHandler = async (event) => {
  document.location.replace('/profile');
}

document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler)

document
  .querySelector('.cancel')
  .addEventListener('click', cancelHandler)