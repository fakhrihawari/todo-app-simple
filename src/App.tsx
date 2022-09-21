import React, { useEffect, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoLists from "./components/TodoLists";
import TodoContext from "./todo.context";
import TodoReducer from "./todo.reducer";
import { initialStateReducer } from "./models/todo.reducer.type";
import Login from "./components/Login";
import db from "./firebase";
import { Todo } from "./models/todo.model";

function App() {
  const [state, dispatch] = useReducer(TodoReducer, initialStateReducer);  
  useEffect(() => {
    if (state.user.username) {
      db.collection("todo").onSnapshot((snapshot) => {
        let _todosfetch: Todo[] = [];  
        snapshot.docs.map((doc) =>{
          if(doc.data().email === state.user.email){
            _todosfetch = [..._todosfetch,{
              id: doc.data().id,
              isDone: doc.data().isDone,
              todo: doc.data().todo,
              email: doc.data().email,
            }]
          }
          return doc
        });

        dispatch({
          type: "SET_TODOS",
          payload: _todosfetch.sort((a,b)=>{return a.id<b.id?-1:b.id<a.id?1:0}),
        });

      });
    }
  }, [state.user.username]);
  return (
    <div className="App container">
      <TodoContext.Provider value={{ state, dispatch }}>
        <Login />
        {!state.user.username ? (
          <>
            <div className="task__board--welcome">
            <h1 className="task__heading" style={{border:"none"}}>PUT YOUR TASK TODO ONLINE</h1>
            </div>
          </>
        ) : (
          <>
            <InputField />
            <TodoLists />
          </>
        )}
      </TodoContext.Provider>
    </div>
  );
}

export default App;
