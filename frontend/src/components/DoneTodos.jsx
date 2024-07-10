import Preloader from "./Preloader";




const DoneTodos = ({loading, doneTodos, pendingTodos }) => {
  return (
    <div>
      <h2>Pending Todos:</h2>
      {loading? <Preloader/> :
        <ol>
        {pendingTodos.map((pendingTodo) => (
          <li key={pendingTodo.id}>{pendingTodo.name}</li>
        ))}
      </ol>}
      <h2>Done Todos:</h2>
      {loading? <Preloader/> :
      <ol>
        {doneTodos.map((doneTodo) => (
          <li key={doneTodo.id}>{doneTodo.name}</li>
        ))}
      </ol>}
    </div>
  );
};

export default DoneTodos;
