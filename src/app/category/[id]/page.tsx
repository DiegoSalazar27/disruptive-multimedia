"use client";

import { useAuthToken } from "@/src/hooks/useAuthToken";
import { useQuery } from "@tanstack/react-query";
import ContentList from "../../content/components/contentList";
import { getCategory } from "@/src/datasource/category/category";
import { AddContentModal } from "../../content/components/addContent";

export default function Category({ params }: { params: { id: string } }) {
  const token = useAuthToken();
  const { data } = useQuery({
    queryKey: ["categoryById", params.id],
    queryFn: async () => {
      return getCategory(params.id, token);
    },
  });

  return (
    <div className="px-8 py-4">
      <div className="w-full flex justify-between">
        <h1>{data?.name}</h1>
        <AddContentModal categoryId={params.id} />
      </div>

      <ContentList categoryId={params.id} />
    </div>
  );
}
