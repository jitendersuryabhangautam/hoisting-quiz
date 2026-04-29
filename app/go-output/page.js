import PracticeMode from "@/components/PracticeMode";
import { goOutputQuestions } from "@/lib/goOutputQuestions";

export default function GoOutputPage() {
  return (
    <PracticeMode
      eyebrow="Go output questions"
      title="Predict the Golang output"
      description="This mode includes output-based Golang questions. Switch between shuffle and serial order anytime."
      questions={goOutputQuestions}
      sidebarMode="answers"
      storageKey="go-output"
      enableOrderToggle
      defaultOrderMode="shuffle"
    />
  );
}
