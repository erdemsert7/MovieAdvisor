import questions from "../data/questions.json";
import { useQuestionStore } from "../store/useQuestionStore";

export default function QuestionForm() {
  const { answers, setAnswer } = useQuestionStore();

  return (
    <div className="space-y-10">
      {questions.map((q) => (
        <div key={q.id}>
          <h2 className="text-xl font-semibold mb-3">{q.question}</h2>
          <div className="flex flex-wrap gap-3">
            {q.options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded ${
                  answers[q.id] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setAnswer(q.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
