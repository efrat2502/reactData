import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  //   const changeUser = (obj) => setUser(prev=> {...prev, ...obj});
  const changeUser = (obj) => setUser((prev) => ({ ...prev, ...obj }));

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};
