import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { getCategoriesOfTopic } from "@/src/datasource/category/category";
import { getTopics } from "@/src/datasource/topic/topic";
import { useAuthToken } from "@/src/hooks/useAuthToken";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesList({ topicId }: { topicId: string }) {
  const token = useAuthToken();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoriesOfTopic", topicId],
    queryFn: async () => {
      return await getCategoriesOfTopic({ token, topicId });
    },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return categories!.map((category) => (
    <Link href={`/category/${category.id}`} key={category.id}>
      <Card className="w-full flex flex-col justify-between py-2 max-w-sm">
        <CardHeader>
          <img src={category.coverUrl} alt={category.name} />
        </CardHeader>
        <CardContent>
          <span>{category.name}</span>
        </CardContent>
      </Card>
    </Link>
  ));
}
