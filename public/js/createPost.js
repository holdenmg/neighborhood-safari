

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const state = document.querySelector('#post-state').value.trim();
    const city = document.querySelector('#post-city').value.trim();
    const address = document.querySelector('#post-address').value.trim();
    const text = document.querySelector('#post-desc').value.trim();
    const animal_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    
    
    if (document.querySelector('#post-danger').checked) {
      var dangerChecker = true
    }
    else {
      dangerChecker = false
    }
  
    if (document.querySelector('#post-missing').checked) {
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
   

    if (text) {
      
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ state, city, address, text, animal_id, danger, missing}),
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
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
