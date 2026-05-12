import type { Question, TopicModule } from "@/types/learning";
import { getAllTopicQuestions } from "@/lib/topicEngine";

export function shuffleQuestions<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getPracticeSet(questions: Question[], limit = 8) {
  return shuffleQuestions(questions).slice(0, limit);
}

export function getBalancedCoursePracticeSet(topics: TopicModule[], limit = 10) {
  const onePerTopic = topics.flatMap((topic) => getPracticeSet(getAllTopicQuestions(topic), 1));
  const selectedIds = new Set(onePerTopic.map((question) => question.id));
  const remaining = shuffleQuestions(
    topics.flatMap(getAllTopicQuestions).filter((question) => !selectedIds.has(question.id)),
  ).slice(0, Math.max(0, limit - onePerTopic.length));

  return shuffleQuestions([...onePerTopic, ...remaining]).slice(0, limit);
}

export function getCourseStarterSet(topics: TopicModule[], limit = 10) {
  const onePerTopic = topics.flatMap((topic) => getAllTopicQuestions(topic).slice(0, 1));
  const selectedIds = new Set(onePerTopic.map((question) => question.id));
  const remaining = topics.flatMap(getAllTopicQuestions).filter((question) => !selectedIds.has(question.id));

  return [...onePerTopic, ...remaining].slice(0, limit);
}

export function groupQuestionsBySkill(questions: Question[]) {
  return questions.reduce<Record<string, Question[]>>((groups, question) => {
    question.skillTags.forEach((tag) => {
      groups[tag] = [...(groups[tag] ?? []), question];
    });

    return groups;
  }, {});
}
