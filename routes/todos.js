const express = require('express');
const router = express.Router();

const { addTodo, getAllTodos, getOneTodo, editTodo, deleteTodo } = require('../controllers/todos');
const { userAuth } = require('../middlewares/auth');

router.use(userAuth);

router.post('/', addTodo);

router.get('/', getAllTodos);

router.get('/:id', getOneTodo)

router.put('/:id', editTodo);

router.delete('/:id', deleteTodo)

module.exports = router;