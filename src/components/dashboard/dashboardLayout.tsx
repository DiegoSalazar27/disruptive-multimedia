"use client";
import { SideBar } from "../appbar/sidebar/sidebar";
import { NavBar } from "../appbar/navbar/navbar";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: JSX.Element }) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/login" || pathname === "/signup";

  if (isLoginRoute) {
    return children;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <NavBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
