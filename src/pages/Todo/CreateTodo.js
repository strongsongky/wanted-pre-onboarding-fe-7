import React, { useState } from "react";
import { httpMethod, request } from "../utils/fetchData";
import "./todo.scss";

const CreateTodo = (props) => {
  const [getTodo, setGetTodo] = useState("");
  const access_token = localStorage.getItem("token");
  const getTodoDataHandler = (e) => {
    setGetTodo(e.target.value);
  };

  const toDoSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredTodo = getTodo;

    if (enteredTodo.trim().length === 0) {
      return alert("내용을 입력해주세요");
    }

    const todoData = {
      todo: enteredTodo,
    };
    const res = await request(
      "todos",
      httpMethod.post,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      todoData
    );
    const data = await res.json();
    props.onSaveTodoData(data.todo, data.userId, data.id, data.isCompleted);
    return setGetTodo("");
  };

  return (
    <form onSubmit={toDoSubmitHandler} className="todoForm">
      <input type="text" onChange={getTodoDataHandler} value={getTodo} />
      <button type="submit">등록</button>
    </form>
  );
};

export default CreateTodo;
