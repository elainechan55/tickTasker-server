# Tick Tasker
An API for a user-based site for creating and updating tasks that can be
'ticked' off when completed. This application utilizes Express API web framework
and Mongoose to connect to MongoDB to view and track user tasks.

## Important Links
* [Other Repository](https://github.com/elainechan55/tickTasker-client)
* [Deployed API](https://tick-tasker.herokuapp.com/)
* [Deployed Client](https://elainechan55.github.io/tickTasker-client)

## Planning

### API End Points

| Verb   | URI Pattern            | Description                                     |
|--------|------------------------|-------------------------------------------------|
| POST   | `/sign-up`             | Creates new user                                |
| POST   | `/sign-in`             | Log-in user and return token                    |
| DELETE | `/sign-out`            | Log-out user and delete token                   |
| PATCH  | `/change-password`     | Take in user request with old pw for validation |
| POST   | `/tasks`               | Create new task for user                        |
| GET    | `/tasks`               | View all tasks by user                          |
| GET    | `/tasks/:id`           | View a specific task (with id) by user          |
| PATCH  | `/tasks/:id`           | Update a specific task (with id) by user        |
| DELETE | `/tasks/:id`           | Delete a specific task (with id) by user        |

### Technologies Used
- jQuery
- HTML/CSS
- Javascript

### Entity Relationship Diagram
![TickTasker Entity Relationship Diagram](/tickTaskerERD.jpg)
