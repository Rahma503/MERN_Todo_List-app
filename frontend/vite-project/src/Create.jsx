import React, { useState } from 'react'


import axios from "axios"

export default function Create({setTodos , todos}) {
  const [task,setTask]=useState()
 
  const handelAdd =async ()=>{
    try {
      const res = await axios.post("http://localhost:7000/add",{task:task})

      setTodos([...todos,res.data])
      setTask("")
    } catch (error) {
      console.log("error is ",error)
    }

  }
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
    <form action="">
      <input 
        type="text" 
        placeholder='Add task' 
        value={task}
        onChange={(e) => setTask(e.target.value)}  
        style={{ padding: "10px" }} 
      />
      <button type='button' onClick={handelAdd} className="add-btn"> Add </button>
    </form>
  </div>
  
  )
}
