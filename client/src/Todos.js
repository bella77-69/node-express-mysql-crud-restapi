import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:4000/todos/${id}`)
      .then((response) => {
        getAllTodos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="container">
      <h2 className="text-center"> List Todos </h2>
      <Link to="/add-todo" className="btn btn-primary mb-2">
        {" "}
        Add Todo{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Todo Id </th>
            <th> Name </th>
            <th> Description </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td> {todo.id} </td>
              <td> {todo.name} </td>
              <td>{todo.description}</td>
              <td>
                <Link className="btn btn-info" to={`/edit-todo/${todo.id}`}>
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: "10px" }}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Todos;
