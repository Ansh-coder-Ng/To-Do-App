import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [newTask,setNewTask]=useState("");
  const [currTasks,setCurrTasks]=useState([]);

  function handleChange(event)
  {
      setNewTask(event.target.value)
  }

  const addTask=async()=>{
      setCurrTasks((prev)=>[...prev,newTask])
      localStorage.setItem('tasks', JSON.stringify(currTasks));
      setNewTask("")
  }

  const updateTask=(index,value)=>{
      const updatedTasks = [...currTasks];
      updatedTasks[index] = value; 
      setCurrTasks(updatedTasks)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  
  function removeTask(index)
  {
      setCurrTasks((prev)=>prev.filter((element,i)=>i!=index ) )
      localStorage.setItem('tasks', JSON.stringify(currTasks));
  }

  useEffect(()=>{


    const getFirst=async()=>{

        try{
          const response=await fetch("http://localhost:3000/")
          const data=await response.json();
          console.log(data)

        }
         catch(error)
        { 
        console.log(error)
        }
    }
    getFirst()
  
    const savedTasks=JSON.parse(localStorage.getItem('tasks')) || []
    setCurrTasks(savedTasks);
    console.log(savedTasks);
  },[]);


  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(currTasks));
    const sendTasks=async()=>{
      try{
        const response=await fetch('http://localhost:3000/store',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(currTasks)
        })
        const data=await response.json()
        console.log(data)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    sendTasks()
  },[currTasks]);


  return (
    <>
      <div className='main'>
          <div className='container'>
            <h2>To-Do List</h2>

            <div className='header'>
                <input type='text' value={newTask} onChange={handleChange} />
                <button onClick={addTask}>Add</button>
            </div>

            <div className='tasks'>
                <ol>
                  {currTasks.map((task,index)=>{
                        return (
                        <li className='list-item' key={index}>
                          <span contentEditable={true}  onBlur={(e)=>{updateTask(index,e.target.innerText) } } >
                            {task} 
                          </span>
            
                          <button onClick={() => removeTask(index)}>Remove</button>          
                        </li>
                        )
                  }
                  )}
                </ol>
            </div>
      </div>
      </div>
    </>
  )
}

export default App
