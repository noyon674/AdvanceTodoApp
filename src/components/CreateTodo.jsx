import React, { useState } from 'react'

function CreateTodo(props) {
    const [todo, setTodo] = useState('');

    const handleKey = (e)=>{
        if(e.key === "Enter"){
            const createTodo = {
                name: todo,
                status: 'active'
            }
            props.getTodo(createTodo)
            setTodo('')
        }
    }
  return (
    <div>
        <input 
        type="text"
        name='todo'
        placeholder='Create a new todo...'
        value={todo}
        onChange={e=>setTodo(e.target.value)}
        onKeyDown={handleKey} />
    </div>
  )
}

export default CreateTodo