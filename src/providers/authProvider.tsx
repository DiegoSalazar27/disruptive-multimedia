import React, { useCallback, useEffect } from "react";

import { User, userEmpty } from "../models/user";
import { LoginFormValues } from "../app/login/models/login";
import { SignUpFormValues } from "../app/signup/models/signUp";
import { getCurrentUser, login, signUp } from "../datasource/auth/authService";
import { AUTH_TOKEN } from "../models/const";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface AuthContextType {
  user?: User;
  isValidAdmin: () => boolean;
  signin: (credentials: LoginFormValues) => Promise<void>;
  signup: (credentials: SignUpFormValues) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

async function getCurrentUserQuery(token: string): Promise<User> {
  try {
    const userToken = token;
    if (!userToken) {
      return userEmpty();
    }

    const user = await getCurrentUser(userToken);

    return user;
  } catch (error) {
    console.log(error);

    return userEmpty();
  }
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const {
    setValue: setToken,
    refetch: refetchToken,
  } = useLocalStorage(AUTH_TOKEN, "");
  const client = useQueryClient();
  const { data: user, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem(AUTH_TOKEN);
      
      if (token) {
        return getCurrentUserQuery(token);
      }

      return userEmpty();
    },
    placeholderData: {
      id: "unknown", // So we know there's no response from server yet
      email: "",
      alias: "Guest",
      role: "lector",
    },
  });

  const signin = async (credentials: LoginFormValues) => {
    try {
      const result = await login(credentials);

      setToken(result);

      refetchToken();
      await client.invalidateQueries({
        queryKey: ["currentUser"],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signout = async () => {
    localStorage.removeItem(AUTH_TOKEN);
    refetchToken();
    refetch();
  };

  const signup = async (credentials: SignUpFormValues) => {
    try {
      await signUp(credentials);
      await signin(credentials);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  function isValidAdmin(): boolean {
    return !!user!.id && user!.id !== "unknown";
  }

  const value = { user, signin, signout, signup, isValidAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
