import PracticeMode from "@/components/PracticeMode";
import { implementationQuestions } from "@/lib/implementationQuestions";

export default function ImplementationPage() {
  return (
    <PracticeMode
      eyebrow="JavaScript implementation questions"
      title="JavaScript coding practice"
      description="This mode contains JavaScript implementation tasks, so you can focus on writing functions, logic, and algorithms."
      questions={implementationQuestions}
      storageKey="implementation"
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
