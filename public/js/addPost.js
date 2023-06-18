const createPost = async (e) => {
    e.preventDefault();
  
    const image = document.getElementById('avatar').value.trim();
    const description = document.getElementById('description').value.trim();
    console.log(description, image);
  
    if (image && description) {
      const form = document.getElementById('form');
      const formData = new FormData(form);
      formData.append('description', description); // Append description to the FormData
  
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        window.location.replace('/');
      } else {
        alert('Post did not upload');
      }
    }
  };
  
  document.getElementById('post').addEventListener('click', createPost);
  