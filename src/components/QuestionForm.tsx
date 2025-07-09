"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import OptionButton from "./OptionButton";
import { Button } from "./Button";
import { X } from "lucide-react";

interface QuestionFormProps {
  current: {
    id: number;
    question: string;
    multiSelect?: boolean;
    options: { label: string; icon: string; key?: string }[];
  };
  answers: Record<number, string | string[]>;
  setAnswer: (id: number, option: string | string[]) => void;
  t: (key: string) => string;
}

export default function QuestionForm({
  current,
  answers,
  setAnswer,
  t,
}: QuestionFormProps) {
  const handleOptionClick = (optionLabel: string) => {
    if (current.multiSelect) {
      const currentAnswers = (answers[current.id] as string[]) || [];
      if (currentAnswers.includes(optionLabel)) {
        const newAnswers = currentAnswers.filter(
          (answer) => answer !== optionLabel
        );
        setAnswer(current.id, newAnswers);
      } else {
        const newAnswers = [...currentAnswers, optionLabel];
        setAnswer(current.id, newAnswers);
      }
    } else {
      setAnswer(current.id, optionLabel);
    }
  };

  const isOptionSelected = (optionLabel: string) => {
    if (current.multiSelect) {
      const currentAnswers = (answers[current.id] as string[]) || [];
      return currentAnswers.includes(optionLabel);
    } else {
      return answers[current.id] === optionLabel;
    }
  };
  const handleClearAll = () => {
    if (current.multiSelect) {
      setAnswer(current.id, []);
    }
  };

  const selectedCount = current.multiSelect
    ? ((answers[current.id] as string[]) || []).length
    : 0;

  const isCompactMode = current.options.length > 8;

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center drop-shadow mb-1">
          {t(current.question)}
        </h2>
        <div className="flex flex-col items-center gap-2">
          {current.multiSelect && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {t("questions.multiSelectHint")}
            </p>
          )}
          {current.multiSelect && selectedCount > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {selectedCount} {t("questions.selectedItems")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="h-7 px-3 text-xs bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                {t("questions.clearAll")}
                <X className="w-3 h-3 mr-1" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid gap-3 sm:gap-3 mb-6 w-full ${
          isCompactMode
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-2"
        }`}
      >
        {current.options.map((opt) => {
          const iconName = opt.icon as keyof typeof LucideIcons;
          const IconComponent =
            (LucideIcons[iconName] as LucideIcon) ?? LucideIcons.Sparkles;
          const selected = isOptionSelected(opt.label);

          return (
            <OptionButton
              key={opt.label}
              label={t(
                opt.key
                  ? opt.key
                  : `questions.options.${current.id}.${opt.label}`
              )}
              Icon={IconComponent}
              selected={selected}
              onClick={() => handleOptionClick(opt.label)}
              variant={current.multiSelect ? "multiSelect" : "select"}
              multiSelect={current.multiSelect}
              compact={isCompactMode}
            />
          );
        })}
      </div>
    </>
  );
}
