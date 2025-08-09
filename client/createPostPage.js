export default function createPostPage () {
    createPost.addEventListener('click', async (th) => {
        let response = await fetch('/posts/create');
        response = await response.text();
        mainDiv.innerHTML = response;
        
        // Add file input change handler to show selected filename
        const fileInput = document.getElementById('fileInput');
        const fileLabel = document.querySelector('.custom-file-label');
        if (fileInput && fileLabel) {
            fileInput.addEventListener('change', function() {
                if (this.files[0]) {
                    fileLabel.textContent = this.files[0].name;
                } else {
                    fileLabel.textContent = 'Choose an image file...';
                }
            });
        }
        document.getElementById('postCreateForm').addEventListener('submit', async (event, form) => {
            event.preventDefault();
            const userStr = document.getElementById('userNameArea').innerHTML;
            const userName = userStr.substr(userStr.indexOf('>') + 6);
            if (!userName) {
                alert('You need to be logged in to create a post');
            } else {
                // Create FormData for file upload
                const formData = new FormData();
                formData.append('title', document.getElementById('createPostTitle').value);
                formData.append('body', document.getElementById('createPostBody').value);
                formData.append('user', userName);
                
                // Get the file input
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput.files[0]) {
                    formData.append('file', fileInput.files[0]);
                }
                
                const resp = await fetch('/posts/create', {
                    method: 'POST',
                    body: formData
                    // Don't set Content-Type header for FormData - browser sets it automatically
                });
                
                if (resp.ok) {
                    const result = await resp.json();
                    alert('Post Created Successfully!');
                    // Go back to viewing posts instead of redirecting
                    document.getElementById('viewPosts').click();
                } else {
                    const errorText = await resp.text();
                    alert('Error creating post: ' + errorText);
                }
            }
        });
});
}
