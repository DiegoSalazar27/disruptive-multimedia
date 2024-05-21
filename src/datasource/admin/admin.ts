import { AdminFormValues } from "@/src/app/admin/models/admin";
import { User } from "@/src/models/user";

export function createAdmin(values: AdminFormValues): User {
  console.log(values);
  return {
    email: "admin@admin.com",
    id: "admin",
    username: "admin",
    role: "admin",
  };
}

export function getAdmins(): Promise<User[]> {
  return Promise.resolve([
    {
      email: "admin@admin.com",
      id: "admin",
      username: "admin",
      role: "admin",
    },
  ]);
}
