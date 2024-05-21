import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getAdmins } from "@/src/datasource/admin/admin";

export default async function Admins() {
  const admins = await getAdmins();

  return (
    <div className="px-8 py-4">
      <h1>Admins</h1>
      <Table className="px-8 py-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {admins.map((admin) => (
              <>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <button>Edit</button>
                  <button>Delete</button>
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
