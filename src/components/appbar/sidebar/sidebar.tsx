"use client";
import Link from "next/link";
import { useAuth } from "@/src/providers/authProvider";
import { useMemo } from "react";
import { AddTopicModal } from "@/src/app/topic/components/addTopic";
import TopicsList from "../../../app/topic/components/topicsList";
import { Logo } from "@/src/styles/icons/logo";

export function SideBar() {
  const { user } = useAuth();
  const admin = useMemo(() => user?.role === "admin", [user]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-10 w-10" />
            <span className="">Disruptive Content</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="flex flex-col gap-2 items-stretch px-2 py-2 text-sm font-medium lg:px-4">
            {admin && <AddTopicModal />}
            <h1 className="text-lg font-semibold">Temas</h1>

            <div className="flex flex-col gap-1">
              <TopicsList />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
