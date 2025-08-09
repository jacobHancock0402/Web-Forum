
export default function viewPostsPage () {
    // Add image modal functionality to window object
    window.showImageModal = function(imageSrc, title) {
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.zIndex = '9999';
        
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="close" onclick="this.closest('.modal').remove()">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageSrc}" alt="${title}" class="img-fluid">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };
    
    document.getElementById('viewPosts').addEventListener('click', async () => {
        let response = await fetch('/posts/view');
        let unorderedList = document.createElement('ul');
        unorderedList.style = "padding: 0"
        response = await response.json();
        for (const i in response) {
            let imageHtml = '';
            if (response[i].image) {
                imageHtml = `<div class="mb-2"><img src="${response[i].image}" alt="Post image" class="img-fluid rounded" style="max-height: 200px; cursor: pointer;" onclick="showImageModal('${response[i].image}', '${response[i].title}')"></div>`;
            }
            unorderedList.innerHTML += "<li class='position-relative rounded border bg-light p-3' id='" + i + "'><a class='stretched-link'id='getPost" + i + "'></a><h2 class='font-weight-bold'>" + response[i].title + "</h2><p class='text-muted'><i class='bi bi-person-fill'></i> " + response[i].user + "</p>" + imageHtml + "<button style='z-index: 2; position: relative' class=' btn btn-primary d-none d-inline p-2 ' id='like" + i + "'><i class='bi bi-hand-thumbs-up' id='thumbsUp" + i + "'></i></button><p style = 'padding: 0' class = 'p-2 d-inline'id='likeCounter" + i + "'>" + response[i].likes + "</p><button style='z-index: 2; position: relative' class=' btn btn-danger d-none d-inline p-2' id='dislike" + i + "'><i class='bi bi-hand-thumbs-down' id='thumbsDown" + i + "'></i></button></li>";
        }
        mainDiv.innerHTML = unorderedList.outerHTML;
        for (const i in response) {
            let post = await fetch('/post?id=' + i);
            post = await post.json();
            const userStr = document.getElementById('userNameArea').innerHTML;
            const user = userStr.substr(userStr.indexOf('>') + 6);
            for (const j in post.likedBy) {
                if (post.likedBy[j] === user) {
                    document.getElementById('thumbsUp' + i).className += '-fill';
                    break;
                }
            }
            for (const j in post.dislikedBy) {
                if (post.dislikedBy[j] === user) {
                    document.getElementById('thumbsDown' + i).className += '-fill';
                    break;
                }
            }
            const element = unorderedList.querySelectorAll('li')[i];
            element.addEventListener('click', () => {
                mainDiv.innerHTML = element;
                });
                const likeButton = document.getElementById('like' + i);
                const dislikeButton = document.getElementById('dislike' + i);
                likeButton.addEventListener('click', async (button) => {
                    button.stopPropagation()
                const user = document.getElementById('userNameArea').innerHTML;
                if (user.indexOf('>') + 4 >= user.length - 1) {
                    alert('You must be logged in to like a post');
                } else {
                let likeCheck = await fetch('/post?id=' + i);
                likeCheck = await likeCheck.json();
                const userStr = document.getElementById('userNameArea').innerHTML;
                const userName = userStr.substr(userStr.indexOf('>') + 6);
                let cantLike = false;
                for (const j in likeCheck.likedBy) {
                    if (likeCheck.likedBy[j] === userName) {
                        cantLike = true;
                        alert('You have already liked or disliked this post');
                        break;
                    }
                }
                for (const j in likeCheck.dislikedBy) {
                    if (likeCheck.dislikedBy[j] === userName) {
                        cantLike = true;
                        alert('You have already liked or disliked this post');
                        break;
                    }
                }
                if (!cantLike) {
                    document.getElementById('thumbsUp' + i).className += '-fill';
                    fetch('/posts/like',
                    {
                        method: 'PUT',
                        body: JSON.stringify(
                        {
                            value: 1,
                            id: i,
                            user: userName
                        }),
                        headers: { 'Content-Type': 'application/json' }
                });
                const likeCounter = document.getElementById('likeCounter' + i);
                const likes = Number(likeCounter.innerHTML) + 1;
                likeCounter.innerHTML = likes;
                }
            }
            });
            dislikeButton.addEventListener('click', async (button) => {
            button.stopPropagation()
            const user = document.getElementById('userNameArea').innerHTML;
            if (user.indexOf('>') + 4 >= user.length - 1) {
                alert('You must be logged in to dislike a post');
            } else {
                let likeCheck = await fetch('/post?id=' + i);
                likeCheck = await likeCheck.json();
                const userStr = document.getElementById('userNameArea').innerHTML;
                const userName = userStr.substr(userStr.indexOf('>') + 6);
                let cantLike = false;
                for (const j in likeCheck.likedBy) {
                    if (likeCheck.likedBy[j] === userName) {
                        cantLike = true;
                        alert('You have already liked or disliked this post');
                        break;
                    }
                }
                for (const j in likeCheck.dislikedBy) {
                    if (likeCheck.dislikedBy[j] === userName) {
                        cantLike = true;
                        alert('You have already liked or disliked this post');
                        break;
                    }
                }
                if (!cantLike) {
                    const userStr = document.getElementById('userNameArea').innerHTML;
                    const userName = userStr.substr(userStr.indexOf('>') + 6);
                    document.getElementById('thumbsDown' + i).className += '-fill';
                    fetch('/posts/like',
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            value: -1,
                            id: i,
                            user: userName
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const likeCounter = document.getElementById('likeCounter' + i);
                    const likes = Number(likeCounter.innerHTML) - 1;
                    likeCounter.innerHTML = likes;
                    }
            }
            });
            }
            let p = 0;
            let viewPostButton = document.getElementById('getPost0');
        while (viewPostButton) {
            viewPostButton.addEventListener('click', async (button) => {
                const postId = button.target.parentElement.id;
                const userStr = document.getElementById('userNameArea').innerHTML;
                const userName = userStr.substr(userStr.indexOf('>') + 6);
                let thisPost = await fetch('post?id=' + postId);
                thisPost = await thisPost.json();
                let imageHtml = '';
                if (thisPost.image) {
                    imageHtml = `<div class="mb-3"><img src="${thisPost.image}" alt="Post image" class="img-fluid rounded" style="max-height: 400px; cursor: pointer;" onclick="showImageModal('${thisPost.image}', '${thisPost.title}')"></div>`;
                }
                mainDiv.innerHTML = "<div class='rounded border bg-light p-3'><h2 class='font-weight-bold'>" + thisPost.title + "</h2><p class='font-weight-light'> " + thisPost.body + "</p>" + imageHtml + "<p><i class='bi bi-person-fill'></i> " + thisPost.user + "</p><div class='row' id='buttonRow'><p class='col-1' id='likeCounter" + postId + "'><i class='bi bi-hand-thumbs-up-fill'></i> " + thisPost.likes + '</p></div></div></div>';
                const addCommentButton = document.createElement('button');
                addCommentButton.innerHTML = " <i class='bi bi-pencil-square'></i> Add Comment";
                addCommentButton.className = 'btn btn-secondary';
                mainDiv.firstChild.appendChild(addCommentButton);
                if (thisPost.user === userName) {
                    const addCommentButton = document.getElementById('addCommentButton');
                    const editButton = document.createElement('button');
                    editButton.innerHTML = 'Edit Post';
                    editButton.className = 'btn btn-primary';
                    const deleteButton = document.createElement('button');
                    deleteButton.innerHTML = 'Delete Post';
                    deleteButton.className = 'btn btn-danger';
                    mainDiv.firstChild.appendChild(editButton);
                    mainDiv.firstChild.appendChild(deleteButton);
                    deleteButton.addEventListener('click', async () => {
                        if(confirm('Are you sure you want to delete this post? This cannot be reversed'))
                        {
                            const response = await fetch('/posts/delete',
                            {
                                method: 'DELETE',
                                body: JSON.stringify({ id: postId }),
                                headers: { 'Content-Type': 'application/json' }
                            });
                            if (response.ok) {
                                alert('Post Deleted');
                            }
                            mainDiv.innerHTML = null;
                           
                        }
                        });

                    editButton.addEventListener('click', async () => {
                        let response = await fetch('/posts/create');
                        response = await response.text();
                        mainDiv.innerHTML = response;
                        const title = document.getElementById('createPostTitle');
                        const body = document.getElementById('createPostBody');
                        document.getElementById('postCreateForm').addEventListener('submit', async (event, form) => {
                            event.preventDefault();
                            const resp = await fetch('/posts/edit',
                            {
                                method: 'PUT',
                                body: JSON.stringify(
                                {
                                    title: title.value,
                                    body: body.value,
                                    id: postId
                                    }),
                                headers: { 'Content-Type': 'application/json' }
                                });
                                if (resp.ok) {
                                alert('Post Edited');
                                }
                        });
                    });
                }
                addCommentButton.addEventListener('click', async () => {
                    let response = await fetch('/comments/create');
                    response = await response.text();
                    mainDiv.innerHTML = response;
                    document.getElementById('commentCreateForm').addEventListener('submit', async (event, form) => {
                        event.preventDefault();
                        const user = document.getElementById('userNameArea').innerHTML;
                        if (user.indexOf('>') + 4 >= user.length - 1) {
                            alert('You need to be logged in to comment');
                        } else {
                            const resp = await fetch('/comments/create',
                            {
                                method: 'POST',
                                body: JSON.stringify(
                                {
                                    body: document.getElementById('createCommentBody').value,
                                    id: postId
                                }
                                ),
                                headers: { 'Content-Type': 'application/json' }
                            });
                            if (resp.ok) {
                                alert('You commented on the post');
                            }
                        }
                    });
                });

                let response = await fetch('/comments?id=' + postId);
                response = await response.json();
                
                unorderedList = document.createElement('ul');
                unorderedList.style = "padding: 0px;"
                //unorderedList.classList.add("col-sm-8")
                unorderedList.classList.add("pr-4")
                unorderedList.classList.add("pl-4")

            
                
            
          
                for (const j in response) {
                    unorderedList.innerHTML += "<li class='justify-content-center border rounded p-3'><p>" + response[j].text + "</p> <button class='btn btn-primary d-none d-inline p-2' id='" + postId + 'like' + j + "'><i class='bi bi-hand-thumbs-up' id='thumbsUpComment"+j+"'></i></button><p class='d-inline col-1' id='" + postId + 'likeCounterComment' + j + "'>" + response[j].likes + "</p><button class='btn btn-danger d-none d-inline p-2' id='" + postId + 'dislike' + j + "'><i class='bi bi-hand-thumbs-down' id='thumbsDownComment" + j + "'></i></button> </li>";
                }
                
                mainDiv.appendChild(unorderedList);

                for (const j in response) {
                    const comment = response[j];
                    const userStr = document.getElementById('userNameArea').innerHTML;
                    const user = userStr.substr(userStr.indexOf('>') + 6);
                    for (const k in comment.likedBy) {
                        if (comment.likedBy[k] === user) {
                            document.getElementById('thumbsUpComment' + j).className += '-fill';
                            break;
                        }
                    }
                    for (const k in comment.dislikedBy) {
                        if (comment.dislikedBy[k] === user) {
                            document.getElementById('thumbsDownComment' + j).className += '-fill';
                        break;
                        }
                    }
                    const commentLikeButton = document.getElementById(postId + 'like' + j);
                    const commentDislikeButton = document.getElementById(postId + 'dislike' + j);
                    commentLikeButton.addEventListener('click', async () => {
                        const user = document.getElementById('userNameArea').innerHTML;
                        if (user.indexOf('>') + 4 >= user.length - 1) {
                            alert('You must be logged in to like a comment');
                        } else {
                            let likeCheck = await fetch('/post?id=' + postId);
                            likeCheck = await likeCheck.json();
                            likeCheck = likeCheck.comments[j];
                            let cantLike = false;
                            const userStr = document.getElementById('userNameArea').innerHTML;
                            const userName = userStr.substr(userStr.indexOf('>') + 6);
                            for (const k in likeCheck.likedBy) {
                                if (likeCheck.likedBy[k] === userName) {
                                    cantLike = true;
                                    alert('You have already liked or disliked this comment');
                                    break;
                                }
                            }
                            for (const k in likeCheck.dislikedBy) {
                                if (likeCheck.dislikedBy[k] === userName) {
                                    cantLike = true;
                                    alert('You have already liked or disliked this comment');
                                    break;
                                }
                            }
                            if (!cantLike) {
                                document.getElementById('thumbsUpComment' + j).className += '-fill';
                                fetch('/comments/like',
                                {
                                    method: 'PUT',
                                    body: JSON.stringify(
                                    {
                                        value: 1,
                                        postId,
                                        commentId: j,
                                        user: userName
                                    }),
                                    headers: { 'Content-Type': 'application/json' }
                                });
                                const likeCounter = document.getElementById(postId + 'likeCounterComment' + j);
                                const likes = Number(likeCounter.innerHTML) + 1;
                                likeCounter.innerHTML = likes;
                            }
                        }
                    });
                    commentDislikeButton.addEventListener('click', async () => {
                        const user = document.getElementById('userNameArea').innerHTML;
                        if (user.indexOf('>') + 4 >= user.length - 1) {
                            alert('You must be logged in to dislike a comment');
                        } else {
                            let likeCheck = await fetch('/post?id=' + postId);
                            likeCheck = await likeCheck.json();
                            likeCheck = likeCheck.comments[j];
                            let cantLike = false;
                            const userStr = document.getElementById('userNameArea').innerHTML;
                            const userName = userStr.substr(userStr.indexOf('>') + 6);
                            for (const k in likeCheck.likedBy) {
                                if (likeCheck.likedBy[k] === userName) {
                                    cantLike = true;
                                    alert('You have already liked or disliked this comment');
                                    break;
                                }
                            }
                            for (const k in likeCheck.dislikedBy) {
                                if (likeCheck.dislikedBy[k] === userName) {
                                    cantLike = true;
                                    alert('You have already liked or disliked this comment');
                                    break;
                                }
                            }
                            if (!cantLike) {
                                document.getElementById('thumbsDownComment' + j).className += '-fill';
                                fetch('/comments/like',
                                {
                                    method: 'PUT',
                                    body: JSON.stringify(
                                    {
                                        value: -1,
                                        postId,
                                        commentId: j,
                                        user: userName
                                    }),
                                    headers: { 'Content-Type': 'application/json' }
                                });
                                const likeCounter = document.getElementById(postId + 'likeCounterComment' + j);
                                const likes = Number(likeCounter.innerHTML) - 1;
                                likeCounter.innerHTML = likes;
                            }
                        }
                    });
                }
            });
            p++;
            viewPostButton = document.getElementById('getPost' + p);
        }
    });
}
