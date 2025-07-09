"use client";

import movieQuestions from "../data/moviesQuestions.json";
import seriesQuestions from "../data/seriesQuestions.json";
import { useAppStore } from "../store/useAppStore";
import { useState, useEffect } from "react";
import { useQuestionStore } from "../store/useQuestionStore";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import AppCard from "./AppCard";
import { Button } from "./Button";
import Stepper from "./Stepper";
import { useLanguage } from "../context/languageContext";
import QuestionForm from "./QuestionForm";
import ConfirmDialog from "./ConfirmDialog";

export default function QuestionStepper() {
  const { answers, setAnswer } = useQuestionStore();
  const { category } = useAppStore();
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const questions = category === "movie" ? movieQuestions : seriesQuestions;
  const total = questions.length;
  const current = questions[step];

  useEffect(() => {
    if (!category) {
      router.replace("/");
    }
  }, [category, router]);

  if (!category) return null;

  const isAnswered = () => {
    const answer = answers[current.id];
    if (current.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    } else {
      return answer && answer !== "";
    }
  };

  const goNext = () => {
    if (!isAnswered()) return;
    if (step < total - 1) setStep((s) => s + 1);
    else router.push("/results");
  };

  const goBack = () => {
    if (step === 0) {
      setShowDialog(true);
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    router.replace("/");
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-white/90 via-white/80 to-blue-50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-950 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <Stepper total={total} step={step} />
          <AnimatePresence mode="wait">
            <AppCard className="w-full max-w-xl p-4 sm:p-8 md:p-10">
              <QuestionForm
                current={current}
                answers={answers}
                setAnswer={setAnswer}
                t={t}
              />
              <div className="flex flex-row justify-between gap-3 w-full">
                <Button
                  type="button"
                  variant="navBack"
                  size="sm"
                  onClick={goBack}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> {t("questions.back")}
                </Button>
                <Button
                  type="button"
                  variant="success"
                  size="sm"
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-2"
                  disabled={!isAnswered()}
                >
                  {step === total - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />{" "}
                      {t("questions.finish")}
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-4 h-4" /> {t("questions.next")}
                    </>
                  )}
                </Button>
              </div>
            </AppCard>
          </AnimatePresence>
        </div>
      </div>
      <ConfirmDialog
        open={showDialog}
        title={t("questions.confirmBackTitle")}
        description={t("questions.confirmBackDesc")}
        confirmLabel={t("questions.confirmYes")}
        cancelLabel={t("questions.confirmNo")}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
        variant="default"
      />
    </>
  );
}
