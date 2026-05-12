import { PracticeClient } from "@/components/learning/PracticeClient";
import { topics } from "@/content/topics";

export default function PracticePage() {
  return <PracticeClient topics={topics} />;
}
