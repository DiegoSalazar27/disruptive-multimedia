import { AUTH_TOKEN } from "../models/const";
import { useLocalStorage } from "./useLocalStorage";

export function useAuthToken() {
  const {storedValue} = useLocalStorage(AUTH_TOKEN, "");

  return storedValue;
} 