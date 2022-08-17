import { Todo, User } from "./todo.model";
import {initialStateReducer} from "./todo.reducer.type";
// interface todoReducer {
//     todo:string,
//     todos:Todo[],
//     completeTodos:Todo[]
// }
// const initialState:todoReducer = {
//   todo: "",
//   todos: [],
//   completeTodos:[]
// };
export type TodoContextType ={
    // todo: string;
    // setTodo: React.Dispatch<React.SetStateAction<string>>;
    // handleAdd: (e:React.FormEvent)=>void;
    // todos: Todo[];
    // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    state: typeof initialStateReducer;
    dispatch: React.Dispatch<{ type: "SET_TODO"; payload: string }
    | { type: "SET_TODOS"; payload: Todo[] }
    // | { type: "SET_COMPLETE_TODOS"; payload: Todo[]}
    | { type: "SET_LOGIN_DETAIL"; payload: User}
    | { type: "SET_LOGOUT_DETAIL"; payload: User}
    | { type: "ADD_TODO" ; payload: string}>
}