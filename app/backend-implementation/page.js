import PracticeMode from "@/components/PracticeMode";
import { backendImplementationQuestions } from "@/lib/backendImplementationQuestions";

export default function BackendImplementationPage() {
  return (
    <PracticeMode
      eyebrow="Backend implementation questions"
      title="Build backend solutions"
      description="This mode contains backend implementation tasks only, with optional serial/shuffle order and a collapsible question-list sidebar."
      questions={backendImplementationQuestions}
      storageKey="backend-implementation"
      collapsibleSidebar
      enableQuestionListSidebar
      enableOrderToggle
      defaultOrderMode="serial"
    />
  );
}
