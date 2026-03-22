import PracticeMode from "@/components/PracticeMode";
import { outputQuestions } from "@/lib/outputQuestions";

export default function OutputPage() {
  return (
    <PracticeMode
      eyebrow="Output questions"
      title="Predict the console output"
      description="This mode only includes output-based JavaScript questions. The deck is shuffled every time."
      questions={outputQuestions}
      sidebarMode="answers"
      storageKey="output"
    />
  );
}
