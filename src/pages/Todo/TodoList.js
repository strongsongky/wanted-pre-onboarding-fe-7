import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const todos = props.todo;
  return (
    <ul className="lists">
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </ul>
  );
};

export default TodoList;
