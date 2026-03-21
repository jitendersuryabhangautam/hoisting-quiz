import PracticeMode from "@/components/PracticeMode";
import Link from "next/link";
import { implementationQuestions } from "@/lib/javascriptContent";

export default function ImplementationPage() {
  return (
    <>
      <PracticeMode
        eyebrow="Implementation questions"
        title="Write the code"
        description="This mode contains only implementation tasks, so you can focus on building functions and algorithms."
        questions={implementationQuestions}
      />
    </>
  );
}
