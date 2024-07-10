const express = require('express');
const cors = require ('cors');
const Todo = require('./Models/Todo');
const connection = require('./connection')
const app = express();




app.use(express.json())
app.use(cors())
const PORT = 8000
app.listen(PORT, () => {
    try{
       console.log(`server is running at port ${PORT}`) 
    }
    catch(err){
        console.log(err)
    }
    
})


app.post('/add-todo', async(req, res)=>{
    const todo = new Todo(req.body)
    try{
        await todo.save()
        res.status(201).json({
            status: 'success',
            data: {
                todo
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

app.get('/get-todo', async(req, res)=>{
    const todos = await Todo.find({})
    try{
        res.status(200).json({
            status: 'Success',
            data: {todos}
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    }
})

app.patch('/update-todo/:id', async(req, res)=>{
    const updatedtodo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
        new:true, 
        runValidators: true
    })
    try{
        res.status(200).json({
            status: 'Success',
            data: {updatedtodo}
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

app.delete('/delete/:id', async(req, res)=>{
    const deletedtodo = await Todo.findByIdAndDelete(req.params.id);
    try{
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }

})
