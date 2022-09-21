import { useState } from "react";
import { User } from "../models/todo.model";
const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("user");
    const userToken = tokenString && JSON.parse(tokenString);
    return userToken?.token;
  };

  const getUser = ()=>{
    const user = localStorage.getItem("user");
    const userData =user && JSON.parse(user);
    return userData||{};
  };
  
  const [storeToken, setStoreToken] = useState(getToken());
  const [storeUser, setStoreUser] = useState<User>(getUser());


  const saveUser = (user:User) => {
    console.log("set")
    localStorage.setItem("user", JSON.stringify(user));
    setStoreToken(user.token);
    setStoreUser(user);
  };
  const removeUser = () => {
    localStorage.removeItem("user");
    setStoreToken("");
    setStoreUser({
        username: null,
        email: null,
        token: "",
        expiredTime: "",
      })
  };

  const checkExpired = (user:User)=>{
    if(!user.expiredTime) return false;
    const now = new Date().getTime();
    const setExpired = new Date(user.expiredTime).getTime();
    const duration = 1*60*60*1000;
    if((now-setExpired)>duration){
        removeUser()
        return true;
    };
    return false;
    

  }

  return {saveUser:saveUser,storeToken,storeUser,removeUser:removeUser,checkExpired:checkExpired}
};
export default useToken;
