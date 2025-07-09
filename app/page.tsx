"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Clapperboard, Tv2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import AppCard from "@/components/AppCard";
import { useQuestionStore } from "@/store/useQuestionStore";
import { useLanguage } from "@/context/languageContext";

export default function HomePage() {
  const router = useRouter();
  const { setCategory } = useAppStore();
  const { resetAnswers } = useQuestionStore();
  const { t } = useLanguage();

  const handleSelect = (type: "movie" | "series") => {
    setCategory(type);
    resetAnswers();
    router.push("/questions");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-white/90 via-white/80 to-blue-50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-950">
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-10 mt-8">
        <AppCard>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow-lg">
            {t("home.title")}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 max-w-md mx-auto">
            <span dangerouslySetInnerHTML={{ __html: t("home.subTitle") }} />
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mt-2">
            <button
              onClick={() => handleSelect("movie")}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label={t("home.movieAria")}
            >
              <Clapperboard className="w-6 h-6" /> {t("home.movie")}
            </button>
            <button
              onClick={() => handleSelect("series")}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              aria-label={t("home.seriesAria")}
            >
              <Tv2 className="w-6 h-6" /> {t("home.series")}
            </button>
          </div>
        </AppCard>
      </section>
    </main>
  );
}
