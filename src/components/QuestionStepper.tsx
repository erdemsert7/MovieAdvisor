"use client";

import questions from "@/data/questions.json";
import { useState } from "react";
import { useQuestionStore } from "@/store/useQuestionStore";
import { useRouter } from "next/navigation";

export default function QuestionStepper() {
  const { answers, setAnswer } = useQuestionStore();
  const [step, setStep] = useState(0);
  const router = useRouter();
  const total = questions.length;
  const current = questions[step];

  const handleOptionClick = (option: string) => {
    setAnswer(current.id, option);
  };

  const goNext = () => {
    if (step < total - 1) setStep(step + 1);
    else router.push("/results");
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-sm text-gray-500 mb-4">
        Soru {step + 1} / {total}
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        {current.question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleOptionClick(opt)}
            className={`w-full py-3 px-4 rounded-md border transition ${
              answers[current.id] === opt
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={step === 0}
          className="text-blue-600 hover:underline disabled:opacity-40"
        >
          ⬅ Geri
        </button>

        <button
          onClick={goNext}
          disabled={!answers[current.id]}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-40"
        >
          {step === total - 1 ? "Bitir ve Film Göster" : "Devam ➡"}
        </button>
      </div>
    </div>
  );
}
