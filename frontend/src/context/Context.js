import { createContext, useState, useContext,useEffect } from "react";

const MyContext = createContext();

const Context = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  return (
    <MyContext.Provider value={{ token, setToken }}>
      {children}
    </MyContext.Provider>
  );
};
export const ChatContextState=()=>
{
    return useContext(MyContext);
}
export default Context;
