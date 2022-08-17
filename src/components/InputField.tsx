import {useRef, useContext} from 'react'
import TodoContext from '../todo.context';
import {TodoContextType} from'../models/todo.context.type'
import db from '../firebase';

const InputField = () => {
    const {state, dispatch} = useContext(TodoContext) as TodoContextType
    const inputRef = useRef<HTMLInputElement>(null);
    const addFirestore = async()=>{
      await db.collection("todo").add({ id: Date.now(), todo: state.todo, isDone: false, email:state.user.email })
    }

  return (
    <div className='input__container'>
        <input value={state.todo} onChange={(e)=>dispatch({type:'SET_TODO',payload:e.target.value})} type="text" placeholder='Put your task '  className='input__text'/>
        <button className='input__button' onClick={()=>{
          addFirestore()
          dispatch({type:'ADD_TODO',payload:state.todo});
          inputRef.current?.blur()}}>Add Task</button>
    </div>
  )
}

export default InputField