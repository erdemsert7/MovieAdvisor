"use client";

import { Clapperboard, Tv2 } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/languageContext";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  category?: "movie" | "series" | null;
}

export default function Navbar({ category }: NavbarProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);

  const NAVBAR_CONFIG = {
    default: {
      icon: (
        <Clapperboard
          className="text-black/80
            dark:text-white w-7 h-7"
        />
      ),
      title: t("navbar.defaultTitle"),
    },
    movie: {
      icon: (
        <Clapperboard
          className="text-black/80
            dark:text-white w-7 h-7"
        />
      ),
      title: t("navbar.movieTitle"),
    },
    series: {
      icon: (
        <Tv2
          className="text-black/80
            dark:text-white w-7 h-7"
        />
      ),
      title: t("navbar.seriesTitle"),
    },
  };

  const { icon, title } =
    category === "movie"
      ? NAVBAR_CONFIG.movie
      : category === "series"
      ? NAVBAR_CONFIG.series
      : NAVBAR_CONFIG.default;

  const handleTitleClick = () => {
    if (window.location.pathname.startsWith("/questions")) {
      setShowDialog(true);
    } else {
      router.push("/");
    }
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    router.push("/");
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-gray-200 dark:border-gray-700 transition-all">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 select-none">
            {icon}
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight text-black/80 dark:text-white cursor-pointer"
              onClick={handleTitleClick}
            >
              {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <ConfirmDialog
        open={showDialog}
        title={t("questions.confirmBackTitle")}
        description={t("questions.confirmBackDesc")}
        confirmLabel={t("questions.confirmYes")}
        cancelLabel={t("questions.confirmNo")}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
        showClose
        variant="default"
      />
    </>
  );
}
