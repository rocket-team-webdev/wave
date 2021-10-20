import { useEffect } from "react";

function useLocalStorage(data, storageKey) {
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);
}

export default useLocalStorage;
