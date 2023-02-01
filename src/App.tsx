import { useState } from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchUser } from "./features/userSlice";


function App() {
  const todos = useAppSelector(state => state.todos);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    dispatch(add(todo));
    setTodo("");
  }

  const remove_todo = (id:string) => {
    dispatch(remove(id))
  }

  const currentUser = user.data && user.data.results[0];

  return (
    <div className="App">
      <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder='To do ...' />
      <button onClick={addTodo} >Save</button>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}> <span>{todo.title}</span>
              <button onClick={()=>remove_todo(todo.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
      <div>
         <button onClick={()=>dispatch(fetchUser())}>Fetch User</button>
         {user.loading && "Loading..."}
         {user.error && user.error}
         {currentUser && (
          <div>
            Name:{currentUser.name.title} 
            {currentUser.name.first} {" "}
            Email: {currentUser.email}
            photo: <img src={currentUser.picture.large}/>
          </div>
         )}
      </div>
    </div>
  );
}

export default App;
