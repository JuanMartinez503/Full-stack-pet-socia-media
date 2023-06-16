
const createPost = async (e)=>{
    e.preventDefault()

const image = document.getElementById('avatar').value.trim()
const description = document.getElementById('description').value.trim()
console.log(description, image)

if (image && description){
    const form =document.getElementById('form')
    const formData = new FormData(form)
    const response = await fetch('/api/posts',{
        method: 'POST',
        body: formData,
        // headers: {'Content-type': 'multipart/form-data'}
    })
    if(response.ok){
        window.location.reload()
    } else {
        alert('Post did not upload')
    }
}
}

document.getElementById('post').addEventListener('click', createPost)
