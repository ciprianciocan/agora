export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key, defaultValue = []) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}
