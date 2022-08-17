import { Todo, User } from "../models/todo.model";
interface todoReducer {
    todo:string,
    todos:Todo[],
    // completeTodos: Todo[],
    user:User
}
export const initialStateReducer:todoReducer = {
  todo: "",
  todos: [],
  // completeTodos:[],
  user:{username:null, email:null}
};

export type ACTION_TYPE =
  | { type: "SET_TODO"; payload: string }
  | { type: "SET_TODOS"; payload: Todo[]}
  // | { type: "SET_COMPLETE_TODOS"; payload: Todo[]}
  | { type: "SET_LOGIN_DETAIL"; payload: User}
  | { type: "SET_LOGOUT_DETAIL"; payload: User}
  | { type: "ADD_TODO"; payload: string}