const newFormHandler = async (event) => {
    event.preventDefault();
  
   const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    const text = document.querySelector('#comment-desc').value.trim();
   
  
    if (text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({text, post_id}),
        headers: {
          'Content-Type':  'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        alert('Failed to create comment');
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
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
  
  
  