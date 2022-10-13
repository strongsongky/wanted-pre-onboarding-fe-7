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
