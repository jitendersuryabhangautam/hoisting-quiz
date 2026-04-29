import PracticeMode from "@/components/PracticeMode";
import { outputQuestions } from "@/lib/outputQuestions";

export default function OutputPage() {
  return (
    <PracticeMode
      eyebrow="JavaScript output questions"
      title="Predict JavaScript output"
      description="This mode includes output-based JavaScript questions. Switch between shuffle and serial order anytime."
      questions={outputQuestions}
      sidebarMode="answers"
      storageKey="output"
      enableOrderToggle
      defaultOrderMode="shuffle"
    />
  );
}
