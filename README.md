# Todo-Backend


You have to make a simple to-do list app's backend with following requirements -

- User authentication using JWT and cookies
- A todo endpoint which can add, delete, update and list all todos for a spfc. user
- Todo endpoint will be only for signed in users


### Endpoints

| Endpoint          | Description                        |
| ----------------- | ---------------------------------- |
| POST /login       | to login an existing user          |
| POST /signup      | to signup a new user               |
| GET /todos        | list all todos of the current user |
| POST /todos       | Create a new todo item             |
| PUT /todos/:id    | Update an existing todo            |
| DELETE /todos/:id | Delete an existing todo            |
| GET /todos/:id    | Get a single todo                  |

### Tech Stack

- Node.js and express
- MongoDB / MySQL / PostgreSQL

### Submitting

Please host your app on a service like heroku, railway etc and share the public url and the github repo link

### What we are looking for in the task

- **Error Handling**
    
    An error shouldn't bring down your whole server. Return the right status code and message which would indicate what went wrong.
    
- **A sound structure**
    
    When making things that are going to stay for a while, possibly years or decades, it is important that things are structured, for others who will work on it after you and for you when some bug comes up in the future or you need to extend the functionality
    
- **Planning for future**
    
    When working to make early features, you don't always know the whole feature in the starting, so you need to write code that is easy to change and adapt to new things
    

---
