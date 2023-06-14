const addComment = async (event) => {
    event.preventDefault();
    console.log('hi');
    const comment = document.querySelector('#comment').value.trim();
    let  post_id = event.target.dataset.id
    post_id = parseInt(post_id)
    if (comment) {
      try {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({ comment, post_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
    console.log('hi');
  
          document.location.reload();
        } else {
          alert('Failed to add comment!');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        // Handle error here
      }
    }
  };
  const delButtonHandler = async (event) => {
    event.preventDefault()
    console.log('click');
    if (event.target.hasAttribute('data-info')) {
      const id = event.target.getAttribute('data-info');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  
  document
    .querySelector('#commentBtn')
    .addEventListener('click', addComment);
  
  const deleteBtn = document.querySelectorAll('.deleteButton')
  deleteBtn.forEach(btn=>btn.addEventListener('click', delButtonHandler))