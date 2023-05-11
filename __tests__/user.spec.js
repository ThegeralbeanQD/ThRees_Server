const db = require('../database/connect');
const Users = require('../models/Users');
const request = require('supertest')
const app = require('../app')

escribe('User Model', () => {
    test('Get All Users', async () => {
      const users = await Users.getAll();
      expect(users.length).toBeGreaterThan(0);
    });
  
    test('Get One User By Id', async () => {
      const user = await Users.getOneById(1);
      expect(user).toBeDefined();
    });
  
    test('Get User By Username', async () => {
      const user = await Users.getByUsername('testuser');
      expect(user).toBeDefined();
    });
  
    test('Create New User', async () => {
      const user = await Users.create({
        username: 'newuser',
        password: 'password123'
      });
      expect(user.id).toBeDefined();
    });
  
    test('Update User', async () => {
      const user = await Users.getOneById(1);
      const updatedUser = await user.update({
        name: 'Test User 2',
        postcode: '12345',
        password: 'newpassword',
        profile_pic: 'pic.jpg'
      });
      expect(updatedUser.name).toBe('Test User 2');
    });
  
    test('Delete User', async () => {
      const user = await Users.create({
        username: 'deleteuser',
        password: 'password123'
      });
      const deletedUser = await user.destroy();
      expect(deletedUser.id).toBeDefined();
    });
  });