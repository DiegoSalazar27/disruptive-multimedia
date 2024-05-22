import { CircleUser } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useToast } from "../../ui/use-toast";
import { useAuth } from "@/src/providers/authProvider";
import { isLoggedIn } from "@/src/models/user";
import Link from "next/link";

export function UserMenu() {
  const { user, signout } = useAuth();
  const { toast } = useToast();

  //TODO: implement signout
  const handleSignout = async () => {
    await signout();
    toast({
      title: "Sesión finalizada",
    });
  };

  if (!isLoggedIn(user!)) {
    return (
      <div>
        <Link href={"/login"}>
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>{user!.alias}</DropdownMenuItem>
        <DropdownMenuItem>{user!.role}</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user!.role === "admin" && (
          <>
            <DropdownMenuItem>
              <Link href={"/admin"}>Admins</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/users"}>Usuarios</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
