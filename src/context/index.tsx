import { createContext, useState } from "react";

interface ContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}
interface IUser {
  name: string;
  email: string;
  profile_pic: string;
}
const emptyContext: ContextType = {} as ContextType;
export const ContextProvider = createContext<ContextType>(emptyContext);
export const Context = (props: any) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [auth, setAuth] = useState(false);
  return (
    <ContextProvider.Provider value={{ auth, setAuth, user, setUser }}>
      {props.children}
    </ContextProvider.Provider>
  );
};
