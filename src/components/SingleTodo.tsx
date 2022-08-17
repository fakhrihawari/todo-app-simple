import { useState, useRef, useEffect, useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone, MdRemoveDone } from "react-icons/md";
import TodoContext from "../todo.context";
import { TodoContextType } from "../models/todo.context.type";
import { Todo } from "../models/todo.model";
import db from "../firebase";
type singleTodoProp = {
  todo: Todo;
};
const SingleTodo = ({ todo }: singleTodoProp) => {
  const { state, dispatch } = useContext(TodoContext) as TodoContextType;
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>("");

  const setTaskToDone = (id: number) => {
    // using reducer
    var jobskill_query = db.collection("todo").where("id", "==", id);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({ isDone: !todo.isDone });
      });
    });

    // dispatch({
    //   type: "SET_TODOS",
    //   payload: [
    //     ...state.todos.map((todo) => {
    //       return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
    //     }),
    //   ],
    // });
  };

  const deleteTask = async (id: number) => {
    // using reducer
    var jobskill_query = db.collection("todo").where("id", "==", id);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    // dispatch({
    //   type: "SET_TODOS",
    //   payload: [...state.todos.filter((todo) => todo.id !== id)],
    // });
  };

  const editTask = (id: number) => {
    // using reducer
    var jobskill_query = db.collection("todo").where("id", "==", id);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({ todo: editTodo });
      });
    });
    // dispatch({
    //   type: "SET_TODOS",
    //   payload: [
    //     ...state.todos.map((todo) => {
    //       return todo.id === id ? { ...todo, todo: editTodo } : todo;
    //     }),
    //   ],
    // });
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <div className="task__single">
      <div className="task__single--button">
        {todo.isDone ? (
          <></>
        ) : (
          <div
            className="icon"
            onClick={() => {
              setEdit(!edit);
              setEditTodo(todo.todo);
            }}
          >
            <AiFillEdit />
          </div>
        )}

        <div className="icon" onClick={() => deleteTask(todo.id)}>
          <AiFillDelete />
        </div>
        <div className="icon" onClick={() => setTaskToDone(todo.id)}>
          {todo.isDone ? <MdRemoveDone /> : <MdDone />}
        </div>
      </div>
      <div className="task__single--content">
        {edit ? (
          <div className="edit__wrapper">
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="edit__todos"
            />
            <button className="edit__button" onClick={() => editTask(todo.id)}>
              Update
            </button>
          </div>
        ) : (
          <p> {todo.todo}</p>
        )}
      </div>
    </div>
  );
};

export default SingleTodo;
