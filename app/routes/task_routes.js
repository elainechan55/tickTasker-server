// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for tasks
const Task = require('../models/task')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Create tasks
// POST /tasks
router.post('/tasks', requireToken, (req, res, next) => {
  const taskData = req.body.task
  // set owner of new task to be current user
  taskData.owner = req.user.id

  Task.create(taskData)
    // respond to succesful `create` with status 201 and JSON of new task
    .then(task => {
      res.status(201).json({ task: task })
    })
    // if an error occurs, pass it off to our error handler
    .catch(next)
})

// Index tasks (see all tasks)
// GET /tasks
router.get('/tasks', requireToken, (req, res, next) => {
  // Task.find({ owner: req.user })
  Task.find()
    .then(tasks => {
      // `tasks` will be an array of Mongoose documents
      // convert each task to a POJO (`.map` to apply `.toObject` to each)
      return tasks.map(tasks => tasks.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(tasks => res.status(200).json({ tasks: tasks }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// Show a specific task
// GET /tasks/<id>
router.get('/tasks/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  const taskId = req.params.id

  Task.findById(taskId)
    .then(handle404)
    .then(task => res.status(200).json({ task: task.toObject() }))
    .catch(next)
})

// Update a specific task
// PATCH /tasks/<id>
router.patch('/tasks/:id', requireToken, removeBlanks, (req, res, next) => {
  // if client attempts to change `owner` property by including a new owner,
  // prevent by deleting key/value pair
  delete req.body.task.owner
  const taskId = req.params.id

  Task.findById(taskId)
    .then(handle404)
    .then(task => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, task)

      // pass the result of Mongoose's `.update` to the next `.then`
      return task.updateOne(req.body.task)
    })
    .then((updateResult) =>
      Task.findById(taskId)
        .then((task) => res.status(200).json({task: task.toObject()}))
    )
    // .then(async (task) => {
    //   let taskAsync = await Task.findById(taskId)
    //   console.log(taskAsync)
    //   console.log(task)
    //   res.status(200).json({ task: taskAsync.toObject() })
    // })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// Delete a specific tasks
// DELETE /tasks/<id>
router.delete('/tasks/:id', requireToken, (req, res, next) => {
  const taskId = req.params.id

  Task.findById(taskId)
    .then(handle404)
    .then(task => {
      // throw an error if current user doesn't own `task`
      requireOwnership(req, task)
      // delete the task ONLY IF the above didn't throw
      task.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
