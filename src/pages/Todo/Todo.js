import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import { httpMethod, request } from "../utils/fetchData";
import "./todo.scss";

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const saveTodoData = (todo, userId, id, isCompleted) => {
    setTodo((prevData) => {
      return [
        ...prevData,
        { todo: todo, userId: userId, id: id, isCompleted: isCompleted },
      ];
    });
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await request("todos", httpMethod.get, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const data = await res.json();
      setTodo([...data]);
    };
    getTodos();
  }, []);

  return (
    <section className="todoContainer">
      <h1>Todo List</h1>
      <CreateTodo onSaveTodoData={saveTodoData} />
      <TodoList todo={todo} />
    </section>
  );
}
