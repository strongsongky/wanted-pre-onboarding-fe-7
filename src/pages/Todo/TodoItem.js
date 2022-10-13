import React, { useState } from "react";
import "./todo.scss";

const TodoItem = ({ todo, id, isComplet, getTodos }) => {
  const userToken = localStorage.getItem("token");
  const [pressUpdateTodo, setPressUpdateTodo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isComplet);
  const [updateTodo, setUpdateTodo] = useState(todo);

  const btnUIHandler = () => {
    setPressUpdateTodo((current) => !current);
    setUpdateTodo(todo);
  };

  const inputTodoHandler = (e) => {
    setUpdateTodo(e.target.value);
  };

  const submitTodoHandler = (e) => {
    const updatedTodoData = {
      todo: updateTodo,
      isCompleted: isCompleted,
    };
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodoData),
    });

    setTimeout(() => {
      getTodos();
      setPressUpdateTodo(false);
    }, 200);
  };

  const isCompletedHandler = () => {
    const updatedTodoData = {
      todo: todo,
      isCompleted: !isCompleted,
    };

    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodoData),
    });

    setTimeout(() => {
      getTodos();
      setPressUpdateTodo(false);
      setIsCompleted((prev) => !prev);
    }, 200);
  };

  const deleteTodoHandler = () => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setTimeout(() => {
      getTodos();
    }, 200);
  };

  return (
    <div className="list">
      <input
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
            <button onClick={submitTodoHandler} className="listEditBtn">
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
            <button onClick={deleteTodoHandler} className="listDeletetBtn">
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
