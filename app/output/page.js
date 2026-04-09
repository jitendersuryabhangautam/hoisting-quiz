import PracticeMode from "@/components/PracticeMode";
import { outputQuestions } from "@/lib/outputQuestions";

export default function OutputPage() {
  return (
    <PracticeMode
      eyebrow="JavaScript output questions"
      title="Predict JavaScript output"
      description="This mode only includes output-based JavaScript questions. The deck is shuffled every time."
      questions={outputQuestions}
      sidebarMode="answers"
      storageKey="output"
    />
  );
}
