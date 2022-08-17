import { createContext } from "react";
// import {Todo} from './models/todo.model';
// import {initialStateReducer} from './models/todo.reducer.type';
import {TodoContextType} from './models/todo.context.type';
// interface todoReducer {
//     todo:string,
//     todos:Todo[]
// }
// const initialState:todoReducer = {
//   todo: "",
//   todos: [],
// };
// type todoContextType ={
//     todo: string,
//     setTodo: React.Dispatch<React.SetStateAction<string>>
//     handleAdd: (e:React.FormEvent)=>void;
//     todos: Todo[];
//     setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
//     state: typeof initialStateReducer
//     dispatch: React.Dispatch<{ type: "SET_TODO"; payload: string }
//     | { type: "SET_TODOS"; payload: Todo[] }>
//     edit:boolean;
//     setEdit:React.Dispatch<React.SetStateAction<boolean>>

// }
const TodoContext = createContext<TodoContextType|null> (null);

export default TodoContext;