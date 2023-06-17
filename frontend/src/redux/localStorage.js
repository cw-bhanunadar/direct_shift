export const loadState = () => {
  try {
    const user = localStorage.getItem('user');
    if (user == null) {
      return undefined;
    }
    return JSON.parse(user);
  } catch (e) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const user = JSON.stringify(state);
    localStorage.setItem('user', user)
  } catch {}
}
