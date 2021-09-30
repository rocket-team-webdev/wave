function loadLocalStorageItems(storageKey, defaultValue) {
  const data = localStorage.getItem(storageKey);

  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

function setLocalStorage(data, storageKey) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { loadLocalStorageItems, setLocalStorage };
