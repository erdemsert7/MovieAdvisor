"use client";

import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import OptionButton from "@/components/OptionButton";

interface QuestionFormProps {
  current: { id: number; question: string; options: { label: string; icon: string; key?: string }[] };
  answers: Record<number, string>;
  setAnswer: (id: number, option: string) => void;
  t: (key: string) => string;
}

export default function QuestionForm({
  current,
  answers,
  setAnswer,
  t,
}: QuestionFormProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-left drop-shadow mb-1">
          {t(current.question)}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-6 w-full">
        {current.options.map((opt) => {
          const iconName = opt.icon as keyof typeof LucideIcons;
          const IconComponent =
            (LucideIcons[iconName] as LucideIcon) ?? LucideIcons.Sparkles;
          const selected = answers[current.id] === opt.label;
          return (
            <OptionButton
              key={opt.label}
              label={t(opt.key ? opt.key : `questions.options.${current.id}.${opt.label}`)}
              Icon={IconComponent}
              selected={selected}
              onClick={() => setAnswer(current.id, opt.label)}
              variant="select"
            />
          );
        })}
      </div>
    </>
  );
}
