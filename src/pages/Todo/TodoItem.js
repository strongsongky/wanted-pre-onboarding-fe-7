import React, { useState } from "react";
import { httpMethod, request } from "../utils/fetchData";
import "./todo.scss";

const TodoItem = ({ todo }) => {
  const userToken = localStorage.getItem("token");
  const [todoList, setTodoList] = useState(todo);
  const [pressUpdateTodo, setPressUpdateTodo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [updateTodo, setUpdateTodo] = useState(todo.todo);

  const btnUIHandler = () => {
    setPressUpdateTodo((current) => !current);
  };

  const inputTodoHandler = (e) => {
    setUpdateTodo(e.target.value);
  };

  const submitTodoHandler = async (e) => {
    const todoId = e.target.name;
    const updatedTodoData = {
      todo: updateTodo,
      isCompleted: isCompleted,
    };
    const res = await request(
      `todos/${todoId}`,
      httpMethod.put,
      {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      updatedTodoData
    );
    if (res.ok) {
      setTodoList((prevState) => {
        return {
          ...prevState,
          todo: updateTodo,
        };
      });
      setPressUpdateTodo(false);
    }
  };

  const isCompletedHandler = async (e) => {
    const todoId = await e.target.name;
    const updatedTodoData = {
      todo: todo.todo,
      isCompleted: !todo.isCompleted,
    };
    const res = await request(
      `todos/${todoId}`,
      httpMethod.put,
      {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      updatedTodoData
    );
    if (res.ok) {
      setIsCompleted((current) => !current);
    }
  };

  const deleteTodoHandler = async (e) => {
    const todoId = e.target.name;
    const res = await request(`todos/${todoId}`, httpMethod.delete, {
      Authorization: `Bearer ${userToken}`,
    });
    if (res.ok) {
      setTodoList({ id: 0 });
    }
  };

  if (todoList.id === 0) {
    return null;
  }

  return (
    <div className="list">
      <input
        name={todo.id}
        type="checkbox"
        checked={isCompleted}
        onChange={isCompletedHandler}
      />
      {pressUpdateTodo ? (
        <input type="text" onChange={inputTodoHandler} value={updateTodo} />
      ) : (
        <div className={isCompleted ? `${"isCompleted"}` : ``}>
          {updateTodo}
        </div>
      )}
      <div className="listBtns">
        {pressUpdateTodo ? (
          <>
            <button
              name={todo.id}
              onClick={submitTodoHandler}
              className="listEditBtn"
            >
              제출
            </button>
            <button onClick={btnUIHandler} className="listDeletetBtn">
              취소
            </button>
          </>
        ) : (
          <>
            <button onClick={btnUIHandler} className="listEditBtn">
              수정
            </button>
            <button
              name={todo.id}
              onClick={deleteTodoHandler}
              className="listDeletetBtn"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
