import { notFound } from "next/navigation";
import { LevelPageClient } from "@/components/learning/LevelPageClient";
import { getLevelById, getTopicById, topics } from "@/content/topics";

export function generateStaticParams() {
  return topics.flatMap((topic) =>
    topic.levels.map((level) => ({
      topicId: topic.id,
      levelId: level.id,
    })),
  );
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ topicId: string; levelId: string }>;
}) {
  const { topicId, levelId } = await params;
  const topic = getTopicById(topicId);
  const level = getLevelById(topicId, levelId);

  if (!topic || !level) {
    notFound();
  }

  return <LevelPageClient topic={topic} level={level} />;
}
