const Todo = require('../models/todo');

const addTodo = async (req, res) => {
    try {
        const { todoTask } = req.body;
        const newTodo = new Todo (
            {
                todoTask: todoTask,
                UserUserId: req.user.userId,
            }
        );
        const saveNewTodo = await newTodo.save();
        console.log(saveNewTodo);
        res.status(201).send("New todo successfully added");
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const getTodo = await Todo.findAll(
            { 
                where: 
                {
                    UserUserId: req.user.userId 
                }, 
                order: [
                    ['todoId', 'DESC'],
                ]
            }
        );
        if (getTodo.length >= 1)
            res.status(200).json({ getTodo });
        else   
            res.status(404).send("No todos found");
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

const getOneTodo = async (req, res) => {
    try {
        const findTodo = await Todo.findOne(
            { 
                where: 
                { 
                    todoId: req.params.id, 
                    UserUserId: req.user.userId
                },
            }
        );
        if(findTodo) {
            res.status(200).json({ findTodo });
        } else {
            res.status(404).send("Todo not found");
        }
    } catch(err) {
        res.status(500).send({ message: err });
    }
};

const editTodo = async(req, res) => {
    try {
        const { todoTask } = req.body;
        const findTodo = await Todo.findOne(
            { 
                where: 
                { 
                    todoId: req.params.id, 
                    UserUserId: req.user.userId
                }
            }
        );
        if(req.body.todoTask)
            findTodo.todoTask = todoTask;
        const updatedTodo = await findTodo.save();
        res.status(201).send(updatedTodo);
    } catch (err) {
        res.status(500).send({ message: err })
    }
    
};

const deleteTodo = async (req, res) => {
    try {
        const findTodo = await Todo.findOne(
            {
                where: 
                {
                    todoId: req.params.id,
                    UserUserId: req.user.userId,
                }
            }
        )
        if(findTodo) {
            findTodo.destroy();
            res.status(201).send(`Todo ID ${findTodo.todoId} deleted successfully`);
        }
        else
            res.status(404).send("Todo not found");
    } catch(err) {
        res.status(500).send({ message: err });
    }
};

module.exports = {
    addTodo,
    getAllTodos,
    getOneTodo,
    editTodo,
    deleteTodo
}