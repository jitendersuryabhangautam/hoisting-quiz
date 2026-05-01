import PracticeMode from "@/components/PracticeMode";
import { backendImplementationQuestions } from "@/lib/backendImplementationQuestions";

export default function BackendImplementationPage() {
  return (
    <PracticeMode
      eyebrow="Backend implementation questions"
      title="Backend coding practice"
      description="This mode contains backend implementation tasks only (Node.js, Go, PostgreSQL, Redis, system design), with optional serial/shuffle order and a collapsible question-list sidebar."
      questions={backendImplementationQuestions}
      storageKey="backend-implementation"
      enableQuestionListSidebar
      alwaysShowQuestionSidebar
      collapsibleLeftQuestionSidebar
      defaultLeftQuestionSidebarCollapsed
      overlayLeftQuestionSidebar
      answerOnlySidebar
      useReferenceModalForImplementation
      hideDesktopRightSidebar
      enableOrderToggle
      defaultOrderMode="serial"
    />
  );
}
