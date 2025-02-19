const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./models/todo")
const app = express()

app.use(cors()) // to solve same origin policy
app.use(express.json()) // to read json body sent at request body


mongoose.connect(process.env.URI).then(()=>{console.log("connected to db")}
).catch(()=>console.log("can't connect")
)



app.post('/add', async (req, res) => {
    try {
        const task = req.body.task;
        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }
        const newTask = await TodoModel.create({ task });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task", details: err.message });
    }
});

app.get('/alltasks',async(req,res)=>{
    const tasks = await TodoModel.find({__v:false})
    res.json(tasks)
    
})

app.get("/task:id",async(req,res)=>{
    const {id} = req.params
    const task = await TodoModel.findById(id)
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
})

app.delete("/deleted/:id" ,async(req,res)=>{
    const {id} = req.params
    const deletedTask = await TodoModel.findByIdAndDelete(id)

    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
})

app.get('/search',async(req,res)=>{
    const {query} = req.query
    try {
        const tasks = await TodoModel.find({ 
            task: { $regex: query, $options: "i" } // البحث الجزئي بدون حساسية لحالة الأحرف
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
})






app.listen(process.env.port,()=>{
    console.log("server runinng on 7000")
})