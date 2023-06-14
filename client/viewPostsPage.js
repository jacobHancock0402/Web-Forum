
export default function viewPostsPage () {
    document.getElementById('viewPosts').addEventListener('click', async () => {
        let response = await fetch('http://127.0.0.1:8090/posts/view');
        let unorderedList = document.createElement('ul');
        response = await response.json();
        for (const i in response) {
            unorderedList.innerHTML += "<li class='border border-primary p-3 w-100 block><div class='row' id='" + i + "'><div><h2 class='font-weight-bold'>" + response[i].title + "</h2><p><i class='bi bi-person-fill'></i> " + response[i].user + "</p></div><button class='col-2 p-2 btn btn-primary' id='getPost" + i + "'>View Post</button> <button class='col-2 p-2 btn btn-success btn-sm' id='like" + i + "'><i class='bi bi-hand-thumbs-up' id='thumbsUp" + i + "'></i></button><button class='col-2 p-2 btn btn-danger btn-sm' id='dislike" + i + "'><i class='bi bi-hand-thumbs-down' id='thumbsDown" + i + "'></i></button> <p class='col-1' id='likeCounter" + i + "'><i class='bi bi-hand-thumbs-up-fill'></i> " + response[i].likes + '</p></div></li>';
        }
        mainDiv.innerHTML = unorderedList.outerHTML;
        for (const i in response) {
            let post = await fetch('http://127.0.0.1:8090/post?id=' + i);
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
                const user = document.getElementById('userNameArea').innerHTML;
                if (user.indexOf('>') + 4 >= user.length - 1) {
                    alert('You must be logged in to like a post');
                } else {
                let likeCheck = await fetch('http://127.0.0.1:8090/post?id=' + i);
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
                    fetch('http://127.0.0.1:8090/posts/like',
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
                const likes = Number(likeCounter.innerHTML.substr(likeCounter.innerHTML.indexOf('>') + 6)) + 1;
                likeCounter.innerHTML = "<i class='bi bi-hand-thumbs-up-fill'></i> " + likes;
                }
            }
            });
            dislikeButton.addEventListener('click', async (button) => {
            const user = document.getElementById('userNameArea').innerHTML;
            if (user.indexOf('>') + 4 >= user.length - 1) {
                alert('You must be logged in to dislike a post');
            } else {
                let likeCheck = await fetch('http://127.0.0.1:8090/post?id=' + i);
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
                    fetch('http://127.0.0.1:8090/posts/like',
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
                    const likes = Number(likeCounter.innerHTML.substr(likeCounter.innerHTML.indexOf('>') + 6)) - 1;
                    likeCounter.innerHTML = "<i class='bi bi-hand-thumbs-up-fill'></i> " + likes;
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
                mainDiv.innerHTML = "<div class='col-12 p-3 border border-primary rounded'><h2 class='font-weight-bold'>" + thisPost.title + "</h2><p class='font-weight-light'> " + thisPost.body + "</p><p><i class='bi bi-person-fill'></i> " + thisPost.user + "</p><div class='row' id='buttonRow'><p class='col-1' id='likeCounter" + postId + "'><i class='bi bi-hand-thumbs-up-fill'></i> " + thisPost.likes + '</p></div></div></div>';
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
                    deleteButton.className = 'btn btn-primary';
                    mainDiv.firstChild.appendChild(editButton);
                    mainDiv.firstChild.appendChild(deleteButton);
                    deleteButton.addEventListener('click', async () => {
                    const response = await fetch('http://127.0.0.1:8090/posts/delete',
                    {
                        method: 'DELETE',
                        body: JSON.stringify({ id: postId }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (response.ok) {
                        alert('Post Deleted');
                    }
                    mainDiv.innerHTML = null;
                    });
                    editButton.addEventListener('click', async () => {
                        let response = await fetch('http://127.0.0.1:8090/posts/create');
                        response = await response.text();
                        mainDiv.innerHTML = response;
                        const title = document.getElementById('createPostTitle');
                        const body = document.getElementById('createPostBody');
                        document.getElementById('postCreateForm').addEventListener('submit', async (event, form) => {
                            event.preventDefault();
                            const resp = await fetch('http://127.0.0.1:8090/posts/edit',
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
                    let response = await fetch('http://127.0.0.1:8090/comments/create');
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

                let response = await fetch('http://127.0.0.1:8090/comments?id=' + postId);
                response = await response.json();
                unorderedList = document.createElement('ul');
                for (const j in response) {
                    unorderedList.innerHTML += "<li class='border p-2 w-100 block><div class='row' id='" + j + "'><div class='col-5'><p>" + response[j].text + "</p></div> <button class='col-2 p-2 btn btn-success btn-sm' id='" + postId + 'like' + j + "'><i class='bi bi-hand-thumbs-up' id='thumbsUpComment" + j + "''></i></button><button class='col-2 p-2 btn btn-danger btn-sm' id='" + postId + 'dislike' + j + "'><i class='bi bi-hand-thumbs-down' id='thumbsDownComment" + j + "'></i></button> <p class='col-1' id='" + postId + 'likeCounterComment' + j + "'><i class='bi bi-hand-thumbs-up-fill'></i> " + response[j].likes + '</p></div></li>';
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
                            let likeCheck = await fetch('http://127.0.0.1:8090/post?id=' + postId);
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
                                fetch('http://127.0.0.1:8090/comments/like',
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
                                const likes = Number(likeCounter.innerHTML.substr(likeCounter.innerHTML.indexOf('>') + 6)) + 1;
                                likeCounter.innerHTML = "<i class='bi bi-hand-thumbs-up-fill'></i> " + likes;
                            }
                        }
                    });
                    commentDislikeButton.addEventListener('click', async () => {
                        const user = document.getElementById('userNameArea').innerHTML;
                        if (user.indexOf('>') + 4 >= user.length - 1) {
                            alert('You must be logged in to dislike a comment');
                        } else {
                            let likeCheck = await fetch('http://127.0.0.1:8090/post?id=' + postId);
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
                                fetch('http://127.0.0.1:8090/comments/like',
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
                                const likes = Number(likeCounter.innerHTML.substr(likeCounter.innerHTML.indexOf('>') + 6)) - 1;
                                likeCounter.innerHTML = "<i class='bi bi-hand-thumbs-up-fill'></i> " + likes;
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
