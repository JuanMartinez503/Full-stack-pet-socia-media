const createPost = async (e)=>{
    e.preventDefault()

const image = document.getElementById('avatar').value.trim()
const description = document.getElementById('description').value.trim()
console.log(description, image)

if (image && description){
    const response = await fetch('api/posts',{
        method: 'POST',
        body: JSON.stringify({image, description}),
        headers: {'Content-type': 'application/json'}
    })
    if(response.ok){
        window.location.reload()
    } else {
        alert('Post did not upload')
    }
}
}

document.getElementById('post').addEventListener('click', createPost)
