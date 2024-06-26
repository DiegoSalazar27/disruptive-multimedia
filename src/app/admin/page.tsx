"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getAdmins } from "@/src/datasource/users/admin";
import { AddAdminModal } from "./components/addAdmin";
import React from "react";
import { DeleteAdmin } from "./components/deleteAdmin";
import { useQuery } from "@tanstack/react-query";
import { AUTH_TOKEN } from "@/src/models/const";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { useAuth } from "@/src/providers/authProvider";

export default function Admins() {
  const { storedValue: token } = useLocalStorage(AUTH_TOKEN, "");
  const { user } = useAuth();
  const {
    data: admins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      return await getAdmins(token);
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
        <h1>Admins</h1>
        <AddAdminModal></AddAdminModal>
      </div>
      <Table className="px-8 py-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins &&
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.alias}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  {admin.id !== user?.id && <DeleteAdmin id={admin.id} />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
