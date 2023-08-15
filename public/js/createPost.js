

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const state = document.querySelector('#post-state').value.trim();
    const city = document.querySelector('#post-city').value.trim();
    const address = document.querySelector('#post-address').value.trim();
    const text = document.querySelector('#post-desc').value.trim();
    const animal_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    
    const danger = false;
    const missing = false;
    
    var dangerChecker = document.querySelector('#post-danger').value.trim();
    if(dangerChecker === "yes"){
      let danger = true;
    }
    var missingChecker = document.querySelector('#post-missing').value.trim();
    if(missingChecker === "yes"){
      let missing = true;
    }
   
    //const missing = false;
  console.log(animal_id)
    if (location && text) {
      
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
