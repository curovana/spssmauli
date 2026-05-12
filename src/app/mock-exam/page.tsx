import { MockExamClient } from "@/components/learning/MockExamClient";
import { topics } from "@/content/topics";

export default function MockExamPage() {
  return <MockExamClient topics={topics} />;
}
