import { useContext, useEffect } from "react";
import { auth, provider } from "../firebase";
import { User } from "../models/todo.model";
import { TodoContextType } from "../models/todo.context.type";
import TodoContext from "../todo.context";
import useToken from "../customHooks/UseToken";

const Login = () => {
  const { state, dispatch } = useContext(TodoContext) as TodoContextType;
  const { saveUser, storeUser, storeToken, removeUser, checkExpired } = useToken();
  const handleAuth = () => {
    if (!state.user.username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          let obj = {
            username: result.user?.displayName,
            email: result.user?.email,
          };
          setUser(obj, result.user?.getIdTokenResult());
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      removeUser();
      auth
        .signOut()
        .then(() => {
          dispatch({
            type: "SET_LOGOUT_DETAIL",
            payload: {
              username: null,
              email: null,
              token: "",
              expiredTime: "",
            },
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const setUser = async (user: User, promise: any) => {
    const { token } = await promise;
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    const expiredTime =(new Date(now_utc)).toISOString();
    user = { ...user, token: token, expiredTime: expiredTime };
    // set to session
    saveUser(user);
    dispatch({
      type: "SET_LOGIN_DETAIL",
      payload: user,
    });
  };

  useEffect(() => {
    if (storeUser && !checkExpired(storeUser) && !state.user.token) {
      dispatch({
        type: "SET_LOGIN_DETAIL",
        payload: storeUser,
      });
    }
  }, [state.user, storeToken, storeUser]);

  return (
    <div className="login__wrapper">
      <h1 className="login_title">Task Todo Note </h1>
      <div className="login__todo--wrapper" onClick={handleAuth}>
        <h3 className="login__todo__heading">
          {state.user.username ? state.user.username : "Welcome"}
        </h3>
        <button className="input__button login__btn">
          {state.user.username ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
