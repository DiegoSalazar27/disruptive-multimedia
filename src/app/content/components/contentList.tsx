import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { getContentOfCategory } from "@/src/datasource/content/content";
import { useAuthToken } from "@/src/hooks/useAuthToken";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function ContentList({ categoryId }: { categoryId: string }) {
  const token = useAuthToken();
  const {
    data: contentlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contentOfCategory", categoryId],
    queryFn: async () => {
      return await getContentOfCategory({ token, categoryId });
    },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {contentlist!.map((content) => (
        <Card
          className="w-full flex flex-col justify-between items-center py-2 max-w-sm"
          key={content.id}
        >
          <CardContent className="flex flex-col gap-2">
            <span>{content.name}</span>
            <span>Credits: {content.creditsAlias}</span>
          </CardContent>
          <CardFooter>
            <Link target="_blank" href={`${content.fileURL}`}>
              <Button>download file</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
