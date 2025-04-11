"use client";

import httpRequest from "@/utils/httpRequest";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  admin: null,
  signin: (token) => {},
  signOut: () => {},
  getAdminData: () => {},
};

export const AdminContext = createContext(initialState);

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signin = (token) => {
    const key = process.env.ADMIN_ACCESS_TOKEN_KEY;

    if (key) {
      localStorage.setItem(key, token);
      getAdminData();
    }
  };

  const signOut = () => {
    const key = process.env.ADMIN_ACCESS_TOKEN_KEY;

    if (key) {
      localStorage.removeItem(key);
      setAdmin(null);
      router.push("/sign-in");
    }
  };

  const getAdminData = async () => {
    // get user data
    const res = await httpRequest("get", "/auth/me");


    if (res.status == "error") return signOut();

    setAdmin(res.data);
  };

  const functionContainer = {
    signin,
    signOut,
    getAdminData,
  };
  const setAdmin = (user) => {
    dispatch({ type: "SET_ADMIN", payload: user });
  };

  useEffect(() => {
    const key = process.env.ADMIN_ACCESS_TOKEN_KEY;
    const token = key ? localStorage.getItem(key) : null;

    if (token) {
      //get user data
      getAdminData();
    } else {
      setAdmin(null);
      router.push("/sign-in");
    }
  }, []);

  return (
    <AdminContext.Provider value={{ ...state, ...functionContainer }}>
      {children}
    </AdminContext.Provider>
  );
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};
