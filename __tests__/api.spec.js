const request = require('supertest')
const userController = require('../controllers/usersController');
const bcrypt = require('bcrypt');
const app = require('../app')

// describe('api server', () => {
//   let api;

//   beforeAll(() => {
//     api = app.listen(5001, () => {
//       console.log('test running on port 5001');
//     });
//   });

//   afterAll((done) => {
//     console.log('now stopping test server');
//     api.close(done);
//   });

//   test('responds to GET / with status 200', async () => {
//     const response = await request(api).get('/');
//     expect(response.status).toBe(200);
//   });
// });

describe('User API endpoints', () => {
    let token;
  
    beforeAll(async () => {
      // Log in as an existing user and get a token for authentication
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'testuser', password: 'testpassword' });
      token = response.body.token;
    });
  
    describe('GET /api/users', () => {
      test('responds with 200 status code', async () => {
        const response = await request(app)
          .get('/api/users')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });
  
    describe('GET /api/users/:id', () => {
      test('responds with 200 status code for existing user', async () => {
        const users = await User.getAll();
        const id = users[0].id;
        const response = await request(app)
          .get(`/api/users/${id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
  
      test('responds with 404 status code for non-existent user', async () => {
        const response = await request(app)
          .get('/api/users/999')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
      });
    });
  
    describe('POST /api/users', () => {
      test('responds with 201 status code and creates a new user', async () => {
        const newUser = {
          username: 'newuser',
          password: 'newpassword',
          name: 'New User',
        };
        const response = await request(app)
          .post('/api/users')
          .set('Authorization', `Bearer ${token}`)
          .send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.name).toBe(newUser.name);
      });
    });
  
    describe('PUT /api/users/:id', () => {
      test('responds with 200 status code and updates an existing user', async () => {
        const users = await User.getAll();
        const id = users[0].id;
        const updatedUser = {
          name: 'Updated User',
        };
        const response = await request(app)
          .put(`/api/users/${id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedUser.name);
      });
    });
  
    describe('DELETE /api/users/:id', () => {
      test('responds with 200 status code and deletes an existing user', async () => {
        const users = await User.getAll();
        const id = users[0].id;
        const response = await request(app)
          .delete(`/api/users/${id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
      });
  
      test('responds with 404 status code for non-existent user', async () => {
        const response = await request(app)
          .delete('/api/users/999')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
      });
    });
  });