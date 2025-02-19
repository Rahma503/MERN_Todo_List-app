import React, { useEffect } from 'react'
import "./Home.css"
import Create from './Create'
import { useState } from 'react'
import axios from 'axios'
import "./Home.css"

export default function Home() {
  const [todos, setTodos] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:7000/alltasks")
        setTodos(res.data)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks()
  }, [])

  const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:7000/deleted/${taskId}`)
    setTodos(todos.filter(todo => todo._id !== taskId))
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      console.log("please enter thing")
    }
    try {
      const res = await axios.get(`http://localhost:7000/search?query=${search}`)
      setTodos(res.data)
    } catch (error) {

    }
  }

  return (
    <>
      <h1>Todo list</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px" }}
        />
        <button type='button' onClick={handleSearch} className="search-btn"> Search </button>
      </div>

      <div className='todo'>
        <Create setTodos={setTodos} todos={todos} />
        {
          todos.length === 0 ? (
            <h2> Loading... </h2>
          ) : (
            todos.map((todo, index) => (
              <div key={index} className="task-container">
                <span>{todo.task}</span>
                <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
              </div>
            ))
          )
        }
      </div>

    </>
  )
}
