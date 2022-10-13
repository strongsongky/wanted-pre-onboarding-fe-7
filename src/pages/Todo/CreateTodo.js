import React, { useState } from "react";
import "./todo.scss";

const CreateTodo = ({ id, userId, isCompleted, getTodos }) => {
  const [getTodo, setGetTodo] = useState("");

  const getTodoDataHandler = (e) => {
    setGetTodo(e.target.value);
  };

  const toDoSubmitHandler = (e) => {
    const access_token = localStorage.getItem("token");
    e.preventDefault();

    if (getTodo.trim().length === 0) {
      return alert("내용을 입력해주세요");
    }

    const todoData = {
      todo: getTodo,
    };
    fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(todoData),
    });
    setTimeout(() => {
      getTodos();
      setGetTodo("");
    }, 200);
  };

  return (
    <form onSubmit={toDoSubmitHandler} className="todoForm">
      <input type="text" onChange={getTodoDataHandler} value={getTodo} />
      <button type="submit">등록</button>
    </form>
  );
};

export default CreateTodo;
