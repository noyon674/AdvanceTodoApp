import React, { useEffect, useState } from 'react'
import './style.css';
import { MdWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import CreateTodo from './CreateTodo';
import { RxCross2 } from "react-icons/rx";

function Home() {
    const [toggle, setToggle] = useState(true);
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('TodoArray');
        return storedTodos ? JSON.parse(storedTodos) : [];
    })
    const [status, setStatus] = useState('all')
        
    //for getting todo
    const onGetTodoHandle = (data)=>{
        setTodos([...todos, data])
    }

    useEffect(()=>{
        localStorage.setItem("TodoArray", JSON.stringify(todos))
    }, [todos])

    //for changed the status complete
    const handleComplete = (index)=>{
        const updateTodos = todos.map(
            (todo, todoIndex)=> todoIndex == index ? {name: todo.name, status: "complete"}: todo)
        setTodos(updateTodos)
    }
    //remove item
    const handleRemove = (index)=>{
        setTodos(todos.filter((todo, todoIndex)=> todoIndex !== index))
    }
    // change status
    const handleStatus = (status)=>{
        setStatus(status)
    }
    //remove all the items from complete status
    const cleanComplete = ()=>{ 
        setTodos(todos.filter(todo=> todo.status != 'complete'))
    }
  return (
    <div className={toggle ? "dark-main-body": "light-main-body"}>
        <div className="upper-section">
            <div className={toggle ? 'dark-overlay': 'light-overlay'}>
                <div className="header-section">
                    <a href="">LOGO</a>
                    <button onClick={e=>setToggle(!toggle)}>{toggle ? <MdWbSunny />: <IoMoonSharp />}</button>
                </div>
                <div className="input-section">
                    <CreateTodo getTodo = {onGetTodoHandle}/>
                </div>
            </div>
        </div>
        <div className="lower-section">
            <div className="todos">
                {
                    todos && todos.map((todo, index)=>{
                        // showing according status
                        if(todo.status == status){
                            return <div className='todo-div' key={index}>
                            <div className='radio'>
                                {todo.status == 'complete'? <input  type="radio" disabled onClick={e=>handleComplete(index)}/>: <input  type="radio" onClick={e=>handleComplete(index)}/>}
                                <label htmlFor="icon">{todo.name}</label>
                            </div>
                            <button onClick={e=>handleRemove(index)}><RxCross2 /></button>
                        </div>
                        }
                        // showing all the items
                        if(status == 'all'){
                            return <div className='todo-div' key={index}>
                            <div className='radio'>
                            {todo.status == 'complete'? <input  type="radio" disabled onClick={e=>handleComplete(index)}/>: <input  type="radio" onClick={e=>handleComplete(index)}/>}
                                <label >{todo.name}</label>
                            </div>
                            <button onClick={e=>handleRemove(index)}><RxCross2 /></button>
                        </div>
                        }

                    })
                }
            </div>
            <div className='menu-bar'>
                <div className="count-item">
                    <span>{todos.length}</span>
                    <span>Items Left</span>
                </div>
                <div className="menu">
                    <button 
                    className={status == 'all' ? 'active':null} 
                    onClick={e=>handleStatus('all')}>All</button>
                    <button 
                    className={status == 'active' ? 'active': null} 
                    onClick={e=>handleStatus('active')}>Active</button>
                    <button 
                    className={status == 'complete' ? 'active': null} 
                    onClick={e=>handleStatus('complete')}>Complete</button>
                </div>
                <div className="complete-item">
                    <button onClick={cleanComplete}>Clean Complete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home