function TodoItem({ todo, onToggle }) {
    return (
      <div className="flex items-center justify-between p-2 border-b">
        <span className={todo.completed ? "line-through" : ""}>
          {todo.text}
        </span>
        <button
          onClick={() => onToggle(todo.id)}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
      </div>
    );
  }
  
  export default TodoItem;
  