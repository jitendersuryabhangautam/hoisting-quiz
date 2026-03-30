import PracticeMode from "@/components/PracticeMode";
import { goOutputQuestions } from "@/lib/goOutputQuestions";

export default function GoOutputPage() {
  return (
    <PracticeMode
      eyebrow="Go output questions"
      title="Predict the Golang output"
      description="This mode only includes output-based Golang questions. The deck is shuffled every time."
      questions={goOutputQuestions}
      sidebarMode="answers"
      storageKey="go-output"
    />
  );
}
