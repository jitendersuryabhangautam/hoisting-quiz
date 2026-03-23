import { conceptQuestions } from "@/lib/conceptQuestions";

export const backendQuestions = conceptQuestions.filter((question) =>
  ["Go", "PostgreSQL"].includes(question.topic)
);
