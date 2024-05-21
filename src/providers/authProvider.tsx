import React, { useCallback, useEffect } from "react";

import { User, userEmpty } from "../models/user";
import { LoginFormValues } from "../app/login/models/login";
import { SignUpFormValues } from "../app/signup/models/signUp";
import { getCurrentUser, login, signUp } from "../datasource/auth/authService";
import { AUTH_TOKEN } from "../models/const";

export interface AuthContextType {
  user: User;
  isValidAdmin: () => boolean;
  signin: (credentials: LoginFormValues) => Promise<void>;
  signup: (credentials: SignUpFormValues) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = React.useState<User>({
    id: "unknown", // So we know there's no response from server yet
    email: "",
    username: "Guest",
    role: "lector",
  });

  const signin = async (credentials: LoginFormValues) => {
    const result = await login(credentials);

    const access_token = result!;

    localStorage.setItem(AUTH_TOKEN, access_token);

    await getCurrentUserQuery();
  };

  const getCurrentUserQuery = useCallback(async () => {
    const userToken = localStorage.getItem(AUTH_TOKEN);
    console.log(userToken);

    if (!userToken) {
      setUser(userEmpty());
      return;
    }

    try {
      const user = await getCurrentUser(userToken);
      console.log(user);

      setUser(user);
    } catch (error) {
      console.log(error);

      setUser(userEmpty());
    }
  }, []);

  const signout = async () => {
    localStorage.removeItem(AUTH_TOKEN);
    setUser(userEmpty());
  };

  const signup = async (credentials: SignUpFormValues) => {
    try {
      await signUp(credentials);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  function isValidAdmin(): boolean {
    return !!user.id && user.id !== "unknown";
  }

  useEffect(() => {
    getCurrentUserQuery();
  }, [getCurrentUserQuery]);

  const value = { user, signin, signout, signup, isValidAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}