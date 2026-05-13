import { overhauledCourseTopics } from "@/content/topics/overhauled-course-topics";
import type { TopicModule } from "@/types/learning";

export const topics: TopicModule[] = overhauledCourseTopics;

export function getTopicById(topicId: string) {
  return topics.find((topic) => topic.id === topicId);
}

export function getLevelById(topicId: string, levelId: string) {
  const topic = getTopicById(topicId);
  return topic?.levels.find((level) => level.id === levelId);
}
