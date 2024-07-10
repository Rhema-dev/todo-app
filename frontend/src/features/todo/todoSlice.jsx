import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ],
  reducers: {
    addTask: (state, action) => {
      // {type: 'todo/addTask',payload: 'something'}
      const newTask = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      }
      state.push(newTask)
    },
    toggleTask: (state, action) => {
      // {type: 'todo/toggleTask',payload: 20}
      const task = state.find((t) => t.id === action.payload)
      task.completed = !task.completed
    },
    deleteTask: (state, action) => {
      // {type: 'todo/toggleTask',payload: 20}
      state = state.filter((task) => task.id !== action.payload)
      return state
    },
  },
})
export const { addTask, toggleTask, deleteTask } = todoSlice.actions

export default todoSlice.reducer
