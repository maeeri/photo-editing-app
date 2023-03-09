const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcryptjs')

export const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

export const getOneUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(user)
  res.json(user)
}

export const addUser = async (req, res) => {
  const { username, password, name, role } = req.body

  const usernames = (await User.find({})).map((user) => user.username)
  if (usernames.includes(username)) {
    res.status(400).end()
  } else {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return logger.error(err)

      const user = new User({
        username: username,
        password: hash,
        name: name,
        role: role,
      })
      const savedUser = await user.save()

      res.status(201).json(savedUser)
    })
  }
}

export const editUserRole = async (req, res) => {
  const modifier = req.user

  if (modifier.role === 'admin') {
    const { role } = req.body
    const user = await User.findById(req.params.id)
    user.role = role === undefined ? user.role : role
    updateAndRespond(res, req.params.id, user)
  } else {
    res.status(401).end()
  }
}

const updateAndRespond = async (res, id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
  res.json(updatedUser)
}