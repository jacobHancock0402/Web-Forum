export default function createPostPage () {
    createPost.addEventListener('click', async (th) => {
        let response = await fetch('http://127.0.0.1:8090/posts/create');
        response = await response.text();
        mainDiv.innerHTML = response;
        document.getElementById('postCreateForm').addEventListener('submit', async (event, form) => {
            event.preventDefault();
            const userStr = document.getElementById('userNameArea').innerHTML;
            const userName = userStr.substr(userStr.indexOf('>') + 6);
            if (!userName) {
                alert('You need to be logged in to create a post');
            } else {
                const resp = await fetch('/posts/create',
            {
            method: 'POST',
            body: JSON.stringify(
            {
                title: document.getElementById('createPostTitle').value,
                body: document.getElementById('createPostBody').value,
                user: userName
            }
            ),
            headers: { 'Content-Type': 'application/json' }
            });
            if (resp.ok) {
                alert('Post Created');
            }
            }
        });
});
}
