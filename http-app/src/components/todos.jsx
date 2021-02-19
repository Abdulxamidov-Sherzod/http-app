import React, { Component } from "react";
import http from "../services/http";
import { toast } from "react-toastify";
import { RiCheckboxCircleFill } from "react-icons/ri";

const endPoint = "/posts";

export default class Todos extends Component {
  state = {
    todos: [],
  };

  getData = async () => {
    try {
      const { data: todos } = await http.get(endPoint);
      this.setState({ todos });
    } catch (err) {
      console.log("Catch block");
    }
  };

  handleAdd = async () => {
    const { todos } = this.state;
    const body = { title: "title- a", body: "my title body" };
    const { data: todo } = await http.post(endPoint, body);
    this.setState({
      todos: [todo, ...todos],
    });
    return toast.success("Yangi malumot qo'shildi !");
  };

  handleUptade = async (todo) => {
    const { todos } = this.state;
    todo.title = "new title";
    const data = todo;
    const { data: newTodo } = await http.put(endPoint + `/${todo.id}`, data);

    const index = todos.indexOf(todo);
    todos[index] = { ...newTodo };
    this.setState({ todos });
    return toast.warning("Malumotlat o'zgartirildi !");
  };

  handleDelete = async (todoID) => {
    const originalTodos = this.state.todos;
    const todos = originalTodos.filter((todo) => todo.id !== todoID);
    this.setState({ todos });
    try {
      http.delete(endPoint + `/${todoID}`);
      return toast.success(
        <div className="d-flex align-items-center">
          <RiCheckboxCircleFill style={{ fontSize: "35" }} />
          "Malimotlar o'chirildi !"
        </div>
      );
    } catch (err) {
      alert(err.message);
      this.setState({ todos: originalTodos });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="py-4">
        <h2 className="text-center">All Todos</h2>
        <button className="btn btn-danger my-2" onClick={this.handleAdd}>
          Add Todo
        </button>
        <table className="table table-bordered table-hover text-center">
          <thead className="bg-success text-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Complited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "👍" : "👎"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mx-2"
                    onClick={() => this.handleUptade(todo)}
                  >
                    Uptade
                  </button>
                  <button
                    className="btn btn-sm btn-danger mx-2"
                    onClick={() => this.handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
