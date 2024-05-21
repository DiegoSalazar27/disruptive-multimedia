export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export function userEmpty(): User {
  return {
    email: "",
    id: "",
    username: "",
    role: "",
  };
}

export function isLoggedIn(user: User): boolean {
  return !!user.id && user.id !== "unknown";
}
