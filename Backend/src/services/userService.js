// src/services/userService.js
const bcrypt = require('bcrypt') // note: async library
const users = [];

exports.fetchUsers = () => {
  return users;
};

// exports.addUser = (user) => {
//   users.push(user);
//   return user;
// };

exports.loginUser = async (name, password) => {
  const user = users.find(user => user.name === name)
  if (!user) return { status: 400, success: false, message: 'user does not exist' }

  const validatePassword = await bcrypt.compare(password, user.password)
  if (validatePassword) return { status: 200, success: true, message: 'right password', user: { name: user.name } }

  return { status: 401, success: false, message: 'wrong password' }
}

async function createDefaultUser() {
  const hashedPassword = await bcrypt.hash('abc', 10)
  const defaultUser = { name: 'abc@abc.com', password: hashedPassword }
  users.push(defaultUser)
}
createDefaultUser() // crates a default user, temporary for testing


// app.post('/users', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const user = { name: req.body.name, password: hashedPassword }
//     users.push(user)
//     res.status(201).send()
//   } catch {
//     res.status(500).send()
//   }
// })
//

