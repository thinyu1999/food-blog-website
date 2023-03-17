import { ReactElement, createContext, useState } from "react";

export type UserData = {
  id: number;
  role: string;
  userName: string;
  password: string;
};

type AuthProps = {
  isLogin: boolean;
  userData: UserData[];
  activeUser: number;
  setLogin: (props: boolean) => void;
  setUserData: (id: number, data: UserData) => void;
  setActiveUser: (id: number) => void;
  renameActiveUser: (id: number, rename: string) => void;
};

const AuthContextData: AuthProps = {
  isLogin: false,
  activeUser: 0,
  userData: [
    {
      id: 1,
      role: "admin",
      userName: "Tode Gyi",
      password: "Mrbeast6000",
    },
    {
      id: 2,
      role: "user",
      userName: "Tode Gyi Nyi Lay",
      password: "Mrbeast6000",
    },
  ],
  setLogin: () => {},
  setUserData: () => {},
  setActiveUser: () => {},
  renameActiveUser: () => {},
};

export const AuthContext = createContext<AuthProps>(AuthContextData);

type Props = {
  children: ReactElement[] | ReactElement;
};

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState(AuthContextData);
  const setLogin = (props: boolean) => {
    setAuth((i) => ({ ...i, isLogin: props }));
  };
  const setUserData = (id: number, data: UserData) => {
    const updatedData = auth.userData.map((i) => {
      if (i.id === id) {
        return { ...i, ...data };
      } else {
        return i;
      }
    });
    setAuth((i) => ({ ...i, userData: updatedData }));
  };
  const renameActiveUser = (id: number, rename: string) => {
    const updatedData = auth.userData.map((i) => {
      if (i.id === id) {
        return { ...i, userName: rename };
      } else {
        return i;
      }
    });
    setAuth((i) => ({ ...i, userData: updatedData }));
  };
  const setActiveUser = (id: number) => {
    setAuth((i) => ({ ...i, activeUser: id }));
  };
  return (
    <AuthContext.Provider value={{ ...auth, setLogin, setActiveUser, setUserData, renameActiveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;