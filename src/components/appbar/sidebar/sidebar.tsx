"use client";
import Link from "next/link";
import { useAuth } from "@/src/providers/authProvider";
import { useMemo } from "react";
import { AddTopicModal } from "@/src/app/topic/components/addTopic";
import TopicsList from "./topics";
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
            {/* <input
              type="file"
              onChange={async (e) => {
                try {
                  console.log("SENDING");
                  const file = e.target.files![0];
                  const form = new FormData();
                  form.append("name", "test");
                  form.append("file", file);

                  await fetch("http://localhost:3001/upload", {
                    method: "POST",
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    body: form,
                  });

                  console.log("done");
                } catch (error) {
                  console.log(error);
                }
              }}
            /> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
