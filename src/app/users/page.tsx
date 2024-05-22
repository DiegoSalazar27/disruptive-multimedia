"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AUTH_TOKEN } from "@/src/models/const";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { getUsers } from "@/src/datasource/users/users";

export default function Users() {
  const { storedValue: token } = useLocalStorage(AUTH_TOKEN, "");
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers(token);
    },
    placeholderData: [],
    enabled: !!token,
  });

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between w-full">
        <h1>Users</h1>
      </div>
      <Table className="px-8 py-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.alias}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
