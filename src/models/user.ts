export interface User {
  id: string;
  alias: string;
  email: string;
  role: string;
}

export function userEmpty(): User {
  return {
    email: "",
    id: "",
    alias: "",
    role: "",
  };
}

export function isLoggedIn(user: User): boolean {
  return !!user.id && user.id !== "unknown";
}

export function roleToStringRole(role: string): string {
  if (role === "CRUD") {
    return "admin";
  }

  if (role === "CRU") {
    return "creador";
  }

  if (role === "R") {
    return "lector";
  }


  return 'visitante'
}

export function StringRoleToUserRole(stringRole: string): string {
  if (stringRole === "admin") {
    return "CRUD";
  }

  if (stringRole === "creator") {
    return "CRU";
  }

  if (stringRole === "reader") {
    return "R";
  }


  return 'visitante'
}
