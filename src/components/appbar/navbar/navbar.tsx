import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import Link from "next/link";
import { UserMenu } from "./userMenu";
import { SearchBar } from "./search";
import { navLinks } from "../links";
import { ModeToggle } from "../modeToggle";

export function NavBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <NavBarSheet />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchBar />
          </div>
        </form>
      </div>
      <ModeToggle />
      <UserMenu />
    </header>
  );
}

function NavBarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
