const updateButtonHandler = async (event) => {
  event.preventDefault();

  const state = document.querySelector('#post-state').value.trim();
  const city = document.querySelector('#post-city').value.trim();
  const address = document.querySelector('#post-address').value.trim();
  const text = document.querySelector('#post-desc').value.trim();
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
  //const dangerCheck = document.querySelector('#post-danger-update').value
  //const missingCheck = document.querySelector('#post-missing-update').value

  if (document.querySelector('#post-danger-update').checked) {
    var dangerChecker = true
  }
  else {
    dangerChecker = false
  }

  if (document.querySelector('#post-missing-update').checked) {
    var missingChecker = true
  }
  else {
    missingChecker = false
  }


  var danger = false;
  var missing = false;


  if (dangerChecker === true) {
    danger = true;
  };

  if (missingChecker === true) {
    missing = true;
  };

  //console.log(danger)
  //console.log(missing)
 // console.log(dangerChecker)
 // console.log(missingChecker)



  if (text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ state, city, address, text, danger, missing }),
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





document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler)
