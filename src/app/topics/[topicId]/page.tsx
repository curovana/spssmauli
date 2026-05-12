import { notFound } from "next/navigation";
import { TopicPageClient } from "@/components/learning/TopicPageClient";
import { getTopicById } from "@/content/topics";

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = getTopicById(topicId);

  if (!topic) {
    notFound();
  }

  return <TopicPageClient topic={topic} />;
}
