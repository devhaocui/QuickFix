// src/controllers/userController.js
const userService = require('../services/userService');

exports.getAllUsers = (req, res) => {
  const users = userService.fetchUsers();
  res.status(200).json(users);
};

// exports.loginUser = (req, res) => {
//   const users = userService.loginUser();
// }

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { name, password } = req.body
    const result = await userService.loginUser(name, password)
    res.status(result.status).json(result)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// exports.createUser = (req, res) => {
//   const newUser = userService.addUser(req.body);
//   res.status(201).json(newUser);
// };
