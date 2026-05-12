import type { LearningLevel, Question, TopicModule } from "@/types/learning";

export function getAllTopicQuestions(topic: TopicModule): Question[] {
  const levelQuestions = topic.levels.flatMap((level) => [...level.activeRecall, ...level.examDrills]);
  const byId = new Map<string, Question>();

  [...levelQuestions, ...topic.examDrills].forEach((question) => {
    byId.set(question.id, question);
  });

  return Array.from(byId.values());
}

export function getNextLevel(topic: TopicModule, completedLevels: string[]): LearningLevel {
  return topic.levels.find((level) => !completedLevels.includes(level.id)) ?? topic.levels[0];
}

export function getLevelState(level: LearningLevel, completedLevels: string[]) {
  if (completedLevels.includes(level.id)) {
    return "completed" as const;
  }

  const previousLevels = completedLevels.length;
  if (level.levelNumber === previousLevels + 1) {
    return "current" as const;
  }

  return "locked" as const;
}

export function collectSkillTags(topic: TopicModule) {
  const tagCounts = new Map<string, number>();

  getAllTopicQuestions(topic).forEach((question) => {
    question.skillTags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}
