import { useContext } from "react";
import {TodoContextType} from'../models/todo.context.type'
import TodoContext from "../todo.context";
import SingleTodo from "./SingleTodo";

const TodoLists = () => {
  const { state } = useContext(TodoContext) as TodoContextType
  const {todos} =state;
  return todos.length ?(
    
    <div className="task__lists">
      <div className="tasklist done">
        <h1 className="task__heading">Todo Task</h1>
        <div className="tasklist_content--wrapper">
          {todos
          .filter(todo=>!todo.isDone)
            .map((todo, index) => {
              return (
                <SingleTodo todo={todo} key={todo.id}></SingleTodo>
              );
            })}
        </div>
      </div>

      <div className="tasklist complete">
        <h1 className="task__heading">Complete Task</h1>
        <div className="tasklist_content--wrapper">
          {todos
            .filter(todo=>todo.isDone).map((todo, index) => {
              return (
                <SingleTodo todo={todo} key={todo.id}></SingleTodo>
              );
            })}
        </div>
      </div>
    </div>
  ):(<h1 style={{textAlign:"center", padding:"20px"}}>NO TASK TODO YET...</h1>);
};

export default TodoLists;
