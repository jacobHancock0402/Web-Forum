const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const multer = require('multer')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
app.use(express.static('client'));
app.use(bodyParser.json());
app.use('/images', express.static(__dirname + '/images'))
app.use(fileUpload());
const defaultUsers = [{ username: 'ExampleUser' }];
const defaultPost = [{ title: 'WOW! Look at this example!', body: 'Did you know this website is really good? Like really good, seriously. Do you concur?', "image": "C:/Users/hanco/Documents/'Basketball and School'/'Attractive Photo'", id: '0', likes: 0, comments: [{ text: "Yes, I concur this website is amazing! You can post, comment on your post and even like posts. I've never seen a website so good", likes: 0, likedBy: [], dislikedBy: [] }], user: 'ExampleUser', likedBy: [], dislikedBy: [] }];
users = fs.readFileSync('./data/users.json', 'utf-8');
users = JSON.parse(users);
posts = fs.readFileSync('./data/posts.json', 'utf-8');
posts = JSON.parse(posts);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ dest: "images" });
app.get('/', function (req, resp) {
    resp.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});
app.get('/posts/create', function (req, resp) {
    resp.sendFile(path.join(__dirname, '/client/createPost.html'));
});
app.post('/posts/create', function (req, resp) {
    // Check if required fields are present
    if (!req.body.title || !req.body.body || !req.body.user) {
        return resp.status(400).send("Missing required fields: title, body, or user");
    }
    
    let imagePath = null;
    
    // Handle file upload if present
    if (req.files && req.files.file) {
        const file = req.files.file;
        const uploadPath = __dirname + '/images/' + file.name;
        
        file.mv(uploadPath, function(err) {
            if (err) {
                console.error('File upload error:', err);
                return resp.status(500).send("File upload failed");
            }
            
            // File uploaded successfully, now create the post
            imagePath = '/images/' + file.name;
            createPost();
        });
    } else {
        // No file uploaded, create post without image
        createPost();
    }
    
    function createPost() {
        posts.push({ 
            title: req.body.title, 
            body: req.body.body, 
            image: imagePath, 
            id: posts.length, 
            likes: 0, 
            comments: [], 
            user: req.body.user, 
            likedBy: [], 
            dislikedBy: [] 
        });
        
        fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
        resp.status(200).json({ message: 'Post created successfully', id: posts.length - 1 });
    }
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
        return resp.sendStatus(400);
    }
    posts.splice(req.body.id, 1);
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    resp.sendStatus(200);
});

app.put('/posts/edit', function (req, resp) {
    if (!posts[req.body.id]) {
        return resp.sendStatus(400);
    }
    posts[req.body.id].title = req.body.title;
    posts[req.body.id].body = req.body.body;
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    resp.sendStatus(200);
});
app.put('/posts/like', function (req, resp) {
    if (!posts[req.body.id]) {
        return resp.sendStatus(400);
    }
    posts[req.body.id].likes += req.body.value;
    if (req.body.value === 1) {
        posts[req.body.id].likedBy.push(req.body.user);
    } else {
        posts[req.body.id].dislikedBy.push(req.body.user);
    }
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    resp.send('Request Succesful');
    });
app.get('/post', function (req, resp) {
    if (!posts[req.query.id]) {
        return resp.sendStatus(400);
    }
    resp.json(posts[req.query.id]);
});
app.get('/comments', function (req, resp) {
    if (!posts[req.query.id]) {
        return resp.sendStatus(400);
    }
    resp.json(posts[req.query.id].comments);
});
app.put('/comments/like', function (req, resp) {
    if (!posts[req.body.id]) {
        return resp.send('Request Failed. Invalid ID');
    }
    posts[req.body.postId].comments[req.body.commentId].likes += req.body.value;
    if (req.body.value === 1) {
        posts[req.body.postId].comments[req.body.commentId].likedBy.push(req.body.user);
    } else {
        posts[req.body.postId].comments[req.body.commentId].dislikedBy.push(req.body.user);
    }
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    resp.sendStatus(200);
});
app.get('/comments/create', function (req, resp) {
    resp.sendFile(path.join(__dirname, '/client/createComment.html'));
});
app.post('/comments/create', function (req, resp) {
    if (!posts[req.body.id]) {
        return resp.send('Request Failed. Invalid ID');
    }
    posts[req.body.id].comments.push({ text: req.body.body, likes: 0, likedBy: [], dislikedBy: [] });
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    resp.sendStatus(200);
});
app.get('/comment', function (req, resp) {
    if (!posts[req.query.postId]) {
        return resp.sendStatus(400);
    }
    if (!posts[req.query.postId].comments[req.query.commentId]) {
        return resp.sendStatus(400);
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
            return resp.sendStatus(200);
        }
    }
    resp.sendStatus(400);
});
app.post('/users/create', function (req, resp) {
    // User already created with that username, return 400
    for (const i in users) {
        if (users[i].username === req.body.username) {
                return resp.sendStatus(400);
        }
    }
    users.push({ username: req.body.username });
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    resp.sendStatus(200);
});

module.exports = app;
