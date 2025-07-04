"use client";

import Navbar from "@/components/Navbar";
import QuestionStepper from "@/components/QuestionStepper";
import { useAppStore } from "@/store/useAppStore";

export default function QuestionsPage() {
  const category = useAppStore((s) => s.category);
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-white/90 via-white/80 to-blue-50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-950">
      <Navbar category={category} />
      <QuestionStepper />
    </main>
  );
}
