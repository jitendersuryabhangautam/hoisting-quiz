import PracticeMode from "@/components/PracticeMode";
import { implementationQuestions } from "@/lib/implementationQuestions";

export default function ImplementationPage() {
  return (
    <PracticeMode
      eyebrow="Implementation questions"
      title="Write the code"
      description="This mode contains only implementation tasks, so you can focus on building functions and algorithms."
      questions={implementationQuestions}
      storageKey="implementation"
    />
  );
}
