import { pdfCourseTopics } from "@/content/topics/pdf-course-topics";
import { topic10BinaryLogisticRegression } from "@/content/topics/topic-10-binary-logistic-regression";
import type { TopicModule } from "@/types/learning";

export const topics: TopicModule[] = [...pdfCourseTopics, topic10BinaryLogisticRegression];

export function getTopicById(topicId: string) {
  return topics.find((topic) => topic.id === topicId);
}

export function getLevelById(topicId: string, levelId: string) {
  const topic = getTopicById(topicId);
  return topic?.levels.find((level) => level.id === levelId);
}
