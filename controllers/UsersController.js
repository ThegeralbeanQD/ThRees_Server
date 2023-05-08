const Users = require("../models/User");

async function index(req, res) {
  try {
    const users = await Users.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    const user = await Users.getOneById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    const deletedUser = await Users.delete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
