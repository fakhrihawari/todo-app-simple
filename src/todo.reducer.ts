import {initialStateReducer, ACTION_TYPE} from './models/todo.reducer.type'; 
const TodoReducer = (state: typeof initialStateReducer, action: ACTION_TYPE) => {

  switch (action.type) {
    case "SET_TODO":
      return {
        ...state,
        todo: action.payload,
      };
    case "ADD_TODO":      
      return{
        ...state,
        todos :[...state.todos,{ id: Date.now(), todo: action.payload, isDone: false, email:state.user.email }],
        todo:""
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
      case "SET_LOGIN_DETAIL":
        return {
          ...state,
          user:action.payload
        }
        case "SET_LOGOUT_DETAIL":
          return {
            ...state,
            user:action.payload,
            todos:[]
          }
    default:
      throw new Error();
  }
};
export default TodoReducer;
