import { useContext } from "react";
import { auth, provider } from "../firebase";
import { User } from "../models/todo.model";
import {TodoContextType} from'../models/todo.context.type'
import TodoContext from "../todo.context";

const Login = () => {
    const { state, dispatch } = useContext(TodoContext) as TodoContextType
    const handleAuth =()=>{
        if(!state.user.username){
            auth.signInWithPopup(provider).then((result)=>{
                let obj = {username:result.user?.displayName, email:result.user?.email}
                setUser(obj)
            }).catch((error)=>{
                alert(error.message);
            });
        }else{
            auth.signOut().then(()=>{
                dispatch({
                    type: "SET_LOGOUT_DETAIL",
                    payload:{username:null, email:null}
                  })
            }).catch((error)=>{
                alert(error.message);
            })
        }
        
    }
    const setUser = (user:User)=>{
        dispatch({
            type: "SET_LOGIN_DETAIL",
            payload: user,
          })
    }
    
  return (
    <div className="login__wrapper">
     <h1 className="login_title">Task Todo Note </h1>
      <div className="login__todo--wrapper" onClick={handleAuth}>
        <h3 className="login__todo__heading">{state.user.username? state.user.username :"Welcome"}</h3>
        <button className="input__button login__btn">
        {state.user.username? "Logout": "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
