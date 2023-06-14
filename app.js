const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('client'));
app.use(bodyParser.json());

const users = [{ username: 'ExampleUser' }];
const posts = [{ title: 'WOW! Look at this example!', body: 'Did you know this website is really good? Like really good, seriously. Do you concur?', id: '0', likes: 0, comments: [{ text: "Yes, I concur this website is amazing! You can post, comment on your post and even like posts. I've never seen a website so good", likes: 0, likedBy: [], dislikedBy: [] }], user: 'ExampleUser', likedBy: [], dislikedBy: [] }];
app.get('/', function (req, resp) {
    resp.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});
app.get('/posts/create', function (req, resp) {
    resp.sendFile(path.join(__dirname, '/client/createPost.html'));
});
app.post('/posts/create', function (req, resp) {
    posts.push({ title: req.body.title, body: req.body.body, id: posts.length, likes: 0, comments: [], user: req.body.user, likedBy: [], dislikedBy: [] });
    resp.sendStatus(200);
    resp.redirect('/');
});
app.get('/posts/view', function (req, resp) {
    let swap = true;
    while (swap) {
    swap = false;
        for (let i = 0; i < posts.length - 1; i++) {
            if (posts[i].likes < posts[i + 1].likes) {
                const copy = posts[i];
                posts[i] = posts[i + 1];
                posts[i + 1] = copy;
                posts[i].id = i;
                posts[i + 1].id = i + 1;
                swap = true;
            }
        }
    }
    resp.json(posts);
});

app.delete('/posts/delete', function (req, resp) {
    if (!posts[req.body.id]) {
        resp.sendStatus(400);
    }
    posts.splice(req.body.id, 1);
    resp.sendStatus(200);
});

app.put('/posts/edit', function (req, resp) {
    if (!posts[req.body.id]) {
        resp.sendStatus(400);
    }
    posts[req.body.id].title = req.body.title;
    posts[req.body.id].body = req.body.body;
    resp.sendStatus(200);
});
app.put('/posts/like', function (req, resp) {
    if (!posts[req.body.id]) {
        resp.sendStatus(400);
    }
    posts[req.body.id].likes += req.body.value;
    if (req.body.value === 1) {
        posts[req.body.id].likedBy.push(req.body.user);
    } else {
        posts[req.body.id].dislikedBy.push(req.body.user);
    }
    resp.send('Request Succesful');
    });
app.get('/post', function (req, resp) {
    if (!posts[req.query.id]) {
        resp.sendStatus(400);
    }
    resp.json(posts[req.query.id]);
});
app.get('/comments', function (req, resp) {
    if (!posts[req.query.id]) {
        resp.sendStatus(400);
    }
    resp.json(posts[req.query.id].comments);
});
app.put('/comments/like', function (req, resp) {
    if (!posts[req.body.id]) {
        resp.send('Request Failed. Invalid ID');
    }
    posts[req.body.postId].comments[req.body.commentId].likes += req.body.value;
    if (req.body.value === 1) {
        posts[req.body.postId].comments[req.body.commentId].likedBy.push(req.body.user);
    } else {
        posts[req.body.postId].comments[req.body.commentId].dislikedBy.push(req.body.user);
    }
    resp.sendStatus(200);
});
app.get('/comments/create', function (req, resp) {
    resp.sendFile(path.join(__dirname, '/client/createComment.html'));
});
app.post('/comments/create', function (req, resp) {
    if (!posts[req.body.id]) {
        resp.send('Request Failed. Invalid ID');
    }
    posts[req.body.id].comments.push({ text: req.body.body, likes: 0, likedBy: [], dislikedBy: [] });
    resp.sendStatus(200);
});
app.get('/comment', function (req, resp) {
    if (!posts[req.query.postId]) {
        resp.sendStatus(400);
    }
    if (!posts[req.query.postId].comments[req.query.commentId]) {
        resp.sendStatus(400);
    }
    resp.setHeader('Content-Type', 'application/json');
    resp.json(posts[req.query.postId].comments[req.query.commentId]);
});
app.get('/loginPage', function (req, resp) {
    resp.sendFile(path.join(__dirname, '/client/login.html'));
});
app.get('/login', function (req, resp) {
    for (const i in users) {
        if (users[i].username === req.query.username) {
            resp.sendStatus(200);
        }
    }
    resp.sendStatus(400);
});
app.post('/users/create', function (req, resp) {
    users.push({ username: req.body.username });
    resp.sendStatus(200);
});

module.exports = app;
