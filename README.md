# 원티드 프리온보딩 프론트엔드 - 선발 과제

해당 저장소는 원티드 프리온보딩 프론트엔드 코스 선발 과제 제출용 저장소입니다.

## 프로젝트 실행 방법

```
npm install
npm start
```

## 주요 기능

- 로그인 / 회원가입
  - access_token 저장 여부를 확인하여 <로그인/회원가입> 또는 <투두리스트 입력페이지>로 자동 이동
  
- Todo-List CRUD

## DEMO

DEMO : https://strongsongky.github.io/wanted-pre-onboarding-frontend/

## 컴포넌트

<details>
<summary>CreateTodo : Todo.js 파일에 사용하는 컴포넌트 / 리스트를 입력하고 생성하는 역할</summary>

```javascript
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
```

</details>

<details>
<summary>TodoItem : TodoList.js 파일에 사용하는 컴포넌트 / 생성된 리스트를 수정,삭제하는 역할</summary>

```javascript
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

```

</details>

<details>
<summary>TodoList : Todo.js 파일에 사용하는 컴포넌트 / 작성된 리스트들을 순서에 맞게 나타내는 역할</summary>

```javascript
import TodoItem from "./TodoItem";

const TodoList = ({ todo, getTodos }) => {
  return (
    <ul className="lists">
      {todo.map(({ id, todo, userId, isCompleted }) => {
        return (
          <TodoItem
            todo={todo}
            key={id}
            id={id}
            userId={userId}
            isComplet={isCompleted}
            getTodos={getTodos}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
```

</details>

## 분리 기준

반복되는 모듈을 재사용하고 CRUD의 기능에 맞춰 컴포넌트 분리

## 폴더구조
