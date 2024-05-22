import { useEffect, useState } from "react";
export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window?.localStorage?.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage) {
      setStoredValue(localStorage.getItem(key) ?? initialValue);
      setRefetch(false);
    }
  }, [key, storedValue, initialValue, refetch]);

  function handleRefetch() {
    setRefetch(true);
  }

  function setValue(value: string) {
    try {
      setStoredValue(value);
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { storedValue, setValue, refetch: handleRefetch };
}
