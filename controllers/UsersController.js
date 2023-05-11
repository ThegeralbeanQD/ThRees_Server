const User = require("../models/User");
const bcrypt = require("bcrypt");
const Token = require("../models/Token");

async function index(req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    const user = await User.getOneById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    console.log(salt);
    data["password"] = await bcrypt.hash(data["password"], salt);

    const newUser = await User.create(data);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getByUsername(data.username);
    const authenticated = await bcrypt.compare(data.password, user["password"]);

    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      const token = await Token.create(user["id"]);
      console.log(token);
      res.status(200).json({ authenticated: true, token: token.token });
    }

  } catch (err) {
    res.status(403).json({ "error": err.message })
  }
}

async function update(req, res) {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    const deletedUser = await User.delete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function destroyToken(req, res) {
  try {
    const token = req.params.token;
    const deletedToken = await Token.destroy(token);
    res.json(deletedToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  index,
  show,
  login,
  create,
  update,
  destroy,
  destroyToken
};
