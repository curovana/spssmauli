import { DashboardClient } from "@/components/learning/DashboardClient";
import { topics } from "@/content/topics";

export default function Home() {
  return <DashboardClient topics={topics} />;
}
