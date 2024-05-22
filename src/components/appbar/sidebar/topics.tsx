import { getTopics } from "@/src/datasource/topic/topic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function TopicsList() {
  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      return await getTopics();
    },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return topics!.map((topic, index) => (
    <Link href={`/tematica/${topic.id}`} key={topic.id}>
      <div className="w-full flex justify-between py-2">
        <span>{topic.name}</span>
      </div>
    </Link>
  ));
}
