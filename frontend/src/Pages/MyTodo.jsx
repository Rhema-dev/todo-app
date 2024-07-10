import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import DoneTodos from "../components/DoneTodos";
import axios from 'axios';
import Preloader from "../components/Preloader"; // Import the Preloader component

const MyTodo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [doneTodos, setDoneTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader

  useEffect(() => {
    // setLoading(true); // Show loader before fetch
    axios.get('http://Localhost:8000/get-todo')
      .then(res => {
        setTodos(res.data.data.todos);
        setLoading(false); // Hide loader after fetch
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false); // Hide loader on error
      });

    // Update filtered todos after fetching
    const updatedPendingTodos = todos.filter(todo => todo.pending === true);
    setPendingTodos(updatedPendingTodos);
    const updatedDoneTodos = todos.filter(todo => todo.pending !== true);
    setDoneTodos(updatedDoneTodos);
  }, [todos]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader before addTodo request
    try {
      const response = await axios.post('http://Localhost:8000/add-todo', {
        name: inputValue,
        pending: true
      });
      console.log('todo added', response.data);
      setInputValue('');
      setLoading(false); // Hide loader after successful addTodo
    } catch (error) {
      console.error('Error adding todo:', error);
      setLoading(false); // Hide loader on error
    }
  };

  const handleDelete = (id) => {
    setLoading(true); // Show loader before delete request
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    setLoading(false); // Hide loader after deleting
  };

  const handleEdit = (id) => {
    setEditmode(true);
    setEditId(id);
    // Optionally, you can pre-fill the input field with the todo's current name
    const todoToEdit = todos.find(todo => todo._id === id);
    setInputValue(todoToEdit.name);
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader before updateTodo request
    try {
      const response = await axios.patch(`http://Localhost:8000/update-todo/${editId}`, {
        name: inputValue
      });
      console.log('Updated', response.data);

      // Update todos state to reflect changes
      const updatedTodos = todos.map(todo => {
        if (todo._id === editId) {
          return {
            ...todo,
            name: inputValue // Update the name if you also edit it
          };
        }
        return todo;
      });
      setTodos(updatedTodos);

      // Reset form state
      setEditmode(false);
      setInputValue('');
      setLoading(false); // Hide loader after successful updateTodo
    } catch (error) {
      console.error('Error updating todo:', error);
      setLoading(false); // Hide loader on error
    }
  };

  const handleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, pending: !todo.pending } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
       
      <TodoList
        loading={loading}
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleStatus={handleStatus}
      />
      {!loading&&
      <TodoForm
        inputValue={inputValue}
        handleInput={handleInput}
        editmode={editmode}
        updateTodo={updateTodo}
        addTodo={addTodo}
      />}
      <DoneTodos loading={loading} doneTodos={doneTodos} pendingTodos={pendingTodos} />
    </div>
  );
};

export default MyTodo;
