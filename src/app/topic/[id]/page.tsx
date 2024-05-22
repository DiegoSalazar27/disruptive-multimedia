"use client";

import { useQuery } from "@tanstack/react-query";
import { AddCategoryModal } from "../../category/components/addCategory";
import { getTopic } from "@/src/datasource/topic/topic";

export default function Topic({ params }: { params: { id: string } }) {
  console.log(params.id);
  const { data } = useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      return getTopic(params.id);
    },
  });

  return (
    <div className="px-8 py-4">
      <div className="w-full flex justify-between">
        <h1>{data?.name}</h1>
        <AddCategoryModal />
      </div>
    </div>
  );
}
