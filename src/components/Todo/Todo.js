import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import './Todo.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { fetch, update, add, remove } from '../../services/todoService';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editedTodo, setEditedTodo] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
       fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
        try {
            const accessToken = document.cookie.split("=")[1];
            if(!accessToken){
                navigate('/error');
            }else{
                const response = await fetch(accessToken);
                setTodos(response); 
            }  
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    const handleInputChange = (e) => {
      setNewTodo(e.target.value);
    };
  
    const handleAddTodo = async() => {
      if (newTodo.trim() !== '') {
        try{
            const accessToken = document.cookie.split("=")[1];
            const response = await add(newTodo, accessToken)
            if(response.status === 200){
                fetchTodos();
                setNewTodo('');
            }

        }catch(error){
            console.log('Error:', error.message)
        }
      }
    };

    //update todo

    const handleUpdateTodo = async () => {
        
        try {
            const accessToken = document.cookie.split("=")[1];
            const response = await update(editedTodo.id, editedTodo.title, accessToken)
            if (response.status === 200) {
              fetchTodos();
              setEditedTodo('');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleEditInputChange = (e) => {
        setEditedTodo({
            ...editedTodo,
            title: e.target.value,
        });
    };

    const handleEditTodo = (id, title) => {
        setEditedTodo({
            id,
            title,
        });
    };
        

    //delete todo

    const handleDeleteTodo = async (id) => {
        try {
            const accessToken = document.cookie.split("=")[1];
            const response = await remove(id, accessToken);
            if (response.status === 200) {
                fetchTodos();
            }
        } catch (error) {
          console.log('Error:', error.message);
        }
    };
      
  
    return (
        <>
            <Header />
            <div className='todo'>
            <h1 className='todo-title'>Todo App</h1>
            <div className='input-container'>
                <input
                type="text"
                value={newTodo}
                onChange={handleInputChange}
                className='todo-input'
                placeholder="Enter a new todo"
                />
                <button className='add-button' onClick={handleAddTodo}>
                    <FaPlus/>
                </button>
            </div>
        
            <ul className='todo-list'>
            {todos.map((todo, index) => {
                if (editedTodo.id === todo.id) {
                return (
                    <li key={todo.id} className='todo-item'>
                    <input
                        type="text"
                        value={editedTodo.title}
                        onChange={handleEditInputChange}
                        className='edit-input'
                    />
                    <button className='save-button' onClick={handleUpdateTodo}>
                        <FaCheck />
                    </button>
                    <button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}>
                        <FaTrash />
                    </button>
                    </li>
                );
                } else {
                    return (
                        <li key={todo.id} className='todo-item'>
                            {todo.title}
                        <div className="icon-container">
                        <button className='edit-button' onClick={() => handleEditTodo(todo.id, todo.title)}>
                            <FaEdit />
                        </button>
                        <button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}>
                            <FaTrash />
                        </button>
                        </div>
                        </li>
                    );
                }
            })}
        </ul>

    </div>
            <Footer />
        </>
    );
  };
  
  export default TodoApp;
  
