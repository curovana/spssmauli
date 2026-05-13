import { notFound } from "next/navigation";
import { TopicPageClient } from "@/components/learning/TopicPageClient";
import { getTopicById, topics } from "@/content/topics";

export function generateStaticParams() {
  return topics.map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  if (!topic) {
    notFound();
  }

  return <TopicPageClient topic={topic} />;
}
