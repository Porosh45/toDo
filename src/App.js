import React, { useState } from "react";
import "./styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [todoInput, setTodoInput] = useState("");

  const openModal = () => {
    setModalOpen(true);
    setEditMode(false);
    setTodoInput("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    if (editMode) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: todoInput } : todo
      );
      setTodos(updatedTodos);
      setEditMode(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: todoInput
      };
      setTodos([...todos, newTodo]);
    }
    setTodoInput("");
    closeModal();
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoInput(todoToEdit.text);
    setEditMode(true);
    setEditId(id);
    setModalOpen(true);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>ToDo Application</h1>
      <button onClick={openModal}>Add ToDo</button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={todoInput}
                onChange={handleInputChange}
                placeholder="Enter ToDo"
              />
              <button type="submit">{editMode ? "Edit" : "Add"}</button>
            </form>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ToDo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.text}</td>
              <td>
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
