const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const storage = {
  setItem,
  getItem,
};

export default storage;
