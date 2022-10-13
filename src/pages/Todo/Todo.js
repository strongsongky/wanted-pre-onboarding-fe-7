import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import "./todo.scss";

export default function Todo() {
  const [todo, setTodo] = useState([]);

  const getTodos = () => {
    fetch("https://pre-onboarding-selection-task.shop/todos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setTodo(res);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoContainer">
      <h1>Todo List</h1>
      <CreateTodo
        userId={todo.userId}
        id={todo.id}
        isCompleted={todo.isCompleted}
        getTodos={getTodos}
      />
      <TodoList todo={todo} getTodos={getTodos} />
    </section>
  );
}
