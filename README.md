# Web Forum - Basketball Discussion Platform

A full-stack web application built with Node.js, Express.js, and vanilla JavaScript that allows users to create, view, like/dislike, and comment on basketball forum posts with image upload support.

## Features

- **User Authentication**: Simple username-based login system
- **Post Management**: Create, edit, delete, and view forum posts
- **Image Uploads**: Attach images to posts with clickable previews
- **Interactive Elements**: Like/dislike posts and comments
- **Comment System**: Add comments to posts
- **Responsive Design**: Bootstrap-based UI with modern styling
- **Real-time Updates**: Dynamic content loading without page refreshes

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Styling**: Bootstrap 4.5.3, Bootstrap Icons
- **File Handling**: express-fileupload, multer
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Web-Forum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm start
```

The server will start on:
- http://localhost:8090
- http://127.0.0.1:8090

### Testing
```bash
# Run all tests
npm test

# Run ESLint checks only
npm run pretest
```

## Project Structure

```
Web-Forum/
├── app.js                 # Main Express application logic
├── server.js             # Server entry point and CORS configuration
├── package.json          # Dependencies and scripts
├── client/               # Frontend files
│   ├── index.html       # Main page with navigation
│   ├── script.js        # Main JavaScript entry point
│   ├── loginPage.js     # Login functionality
│   ├── createPostPage.js # Post creation and editing
│   ├── viewPostsPage.js # Post viewing and interaction
│   ├── login.html       # Login form
│   └── createPost.html  # Post creation form
├── data/                 # Data storage
│   ├── users.json       # User accounts
│   └── posts.json       # Forum posts and comments
├── images/               # Uploaded post images
└── README.md            # This file
```

## API Endpoints

### Posts
- `GET /posts/view` - Get all posts
- `GET /post?id={id}` - Get specific post
- `POST /posts/create` - Create new post (supports file uploads)
- `PUT /posts/edit` - Edit existing post
- `DELETE /posts/delete` - Delete post
- `PUT /posts/like` - Like/dislike post

### Comments
- `GET /comments?id={postId}` - Get comments for a post
- `GET /comments/create` - Get comment creation form
- `POST /comments/create` - Create new comment
- `PUT /comments/like` - Like/dislike comment

### Authentication
- `GET /loginPage` - Get login page
- `GET /login?username={username}` - Authenticate user
- `POST /users/create` - Create new user account

## Usage

### Getting Started
1. Start the server with `npm start`
2. Open your browser to http://localhost:8090
3. Click "Login" to create or sign in to an account
4. Use "Create a Post" to add new forum posts
5. Click "View Posts" to browse and interact with posts

### Creating Posts
1. Click "Create a Post" in the navigation
2. Fill in the title and body
3. Optionally attach an image file
4. Click "Submit" to create the post

### Interacting with Posts
- **View**: Click on any post to see full details
- **Like/Dislike**: Use thumbs up/down buttons (requires login)
- **Comment**: Add comments to posts
- **Edit/Delete**: Post creators can modify or remove their posts

### Image Features
- Images are displayed as thumbnails in post lists
- Click any image to view it in a full-screen modal
- Supported formats: All image types (jpg, png, gif, etc.)

## Configuration

### CORS Settings
The server is configured to allow requests from:
- http://localhost:8090
- http://127.0.0.1:8090

### File Uploads
- Images are stored in the `images/` directory
- File size limits are handled by express-fileupload
- Supported file types: Images only

## Development

### Code Style
The project uses ESLint with the Standard configuration for consistent code formatting.

### Adding New Features
1. Follow the existing module pattern in `client/` directory
2. Add corresponding API endpoints in `app.js`
3. Update the main `script.js` to include new functionality
4. Test with Jest before committing

### Testing
- Tests are located in the `__tests__/` directory
- Use `npm test` to run the full test suite
- ESLint checks run automatically before tests

## Troubleshooting

### Common Issues

**"Cannot find module 'express'"**
```bash
npm install
```

**CORS errors in browser**
- Ensure server is running on correct port
- Check that frontend URLs match CORS configuration

**File upload errors**
- Verify `images/` directory exists
- Check file permissions

**"ERR_HTTP_HEADERS_SENT" errors**
- Restart the server after code changes
- Check for multiple response calls in route handlers

### Server Logs
The server provides detailed logging for debugging:
- Server startup messages
- File upload status
- API request/response details

**Note**: This is a development project. For production use, consider adding:
- User authentication with sessions/JWT
- Input validation and sanitization
- Rate limiting
- Database integration
- HTTPS support
- Environment configuration 