const request = require('supertest');
const app = require('./app.js');

describe('Test request for posts', () => {
	test('GET / succeeds', () => {
		return request(app)
		.get('/')
		.expect('Content-type', /html/);
	});
	test('GET / succeeds', async () => {
		return request(app)
		.get('/')
        .expect(200);
	});

	test('GET /posts/create succeeds', async () => {
		return request(app)
		.get('/posts/create')
		.expect('Content-type', /html/);
	});
	test('GET /post/create succeeds', async () => {
		return request(app)
		.get('/posts/create')
        .expect(200);
	});
	test('POST /posts/create succeeds', async () => {
		return request(app)
		.post('/posts/create')
		.send({
			title: 'title',
			body: 'body',
			user: 'username'
		})
		.expect(200);
	});
	test('GET /posts/view succeeds', async () => {
		return request(app)
		.get('/posts/view')
        .expect(200);
	});
	test('GET /posts/view succeeds', () => {
		return request(app)
		.get('/posts/view')
		.expect('Content-type', /json/);
	});
	test('DELETE /posts/delete succeeds', async () => {
		return request(app)
		.delete('/posts/delete')
		.send({
			id: 0
		})
		.expect(200);
	});
	test('GET /posts/view succeeds', () => {
		return request(app)
		.get('/posts/view')
		.expect('Content-type', /json/);
	});
	test('PUT /posts/edit succeeds', async () => {
		return request(app)
		.put('/posts/edit')
		.send({
			"id" : 0,
			"title": "title",
			"body": "text"
		})
        .expect(200);
	});
	test('PUT /posts/like succeeds', async () => {
		return request(app)
		.put('/posts/like')
		.send({
			"value" : 1,
			"id": 0,
			"user": "username",
		})
        .expect(200);
	});
	test('PUT /posts/edit succeeds', async () => {
		return request(app)
		.put('/posts/edit')
		.send({
			"id" : 0,
			"title": "title",
			"body": "text",
		})
        .expect(200);;
	});
	test('GET /post succeeds', async () => {
		return request(app)
		.get('/post?id=0')
        .expect(200);
	});
	test('GET /posts/view succeeds', () => {
		return request(app)
		.get('/posts/view')
		.expect('Content-type', /json/);
	});
})
describe('Test request for comments', () => {
	test('PUT /comments/like succeeds', async () => {
		return request(app)
		.put('/comments/like')
		.send({
			"value": 1,
			"postId": 0,
			"commentId": 0
		})
        .expect(200);
	});
	test('GET /comments succeeds', () => {
		return request(app)
		.get('/comments?id=0')
		.expect('Content-type', /json/);
	});
	test('GET /comments succeeds', async () => {
		return request(app)
		.get('/comments?id=0')
        .expect(200);
	});
	test('GET /comments/create succeeds', async () => {
		return request(app)
		.get('/comments/create')
        .expect(200);
	});
	test('POST /comments/create succeeds', async () => {
		return request(app)
		.post('/comments/create')
		.send({
			body: 'body',
			id: 0
		})
		.expect(200);
	});
	test('GET /comment succeeds', async () => {
		return request(app)
		.get('/comment?postId=0&commentId=0')
        .expect(200);
	});
	test('GET /comment succeeds', () => {
		return request(app)
		.get('/comment?postId=0&commentId=0')
		.expect('Content-type', /json/);
	});
})
describe('Test request for users', () => {
	test('GET /login succeeds', async () => {
		return request(app)
		.get('/login?username=ExampleUser')
		.expect(200);
	});
	test('POST /users/create succeeds', async () => {
		return request(app)
		.post('/users/create')
		.send({
			username: 'username'
		})
		.expect(200);
	});

});
