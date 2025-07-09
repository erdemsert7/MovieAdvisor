"use client";

import { useLanguage } from "../context/languageContext";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./DropdownMenu";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center gap-2 p-2"
      >
        <div className="w-6 h-4 bg-gray-200 rounded-sm animate-pulse" />
        <span className="text-xs font-medium hidden sm:inline">--</span>
      </Button>
    );
  }

  const handleLanguageChange = (lang: "tr" | "en") => {
    console.log("Language changing to:", lang);
    setLanguage(lang);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    console.log("Dropdown open state:", open);
    setIsOpen(open);
  };

  const flagSrc =
    language === "tr" ? "/images/tr-flag.png" : "/images/en-flag.png";
  const flagAlt = language === "tr" ? "Turkish Flag" : "English Flag";
  const flagLabel = language === "tr" ? "TR" : "EN";

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border-0 focus:ring-0 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={flagSrc || "/placeholder.svg"}
            alt={flagAlt}
            width={24}
            height={16}
            className="rounded-sm object-cover"
            priority
          />
          <span className="text-sm font-medium hidden sm:inline dark:text-gray-300 text-gray-700">
            {flagLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        sideOffset={8}
      >
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
          onClick={() => handleLanguageChange("tr")}
        >
          <Image
            src="/images/tr-flag.png"
            alt="Turkish Flag"
            width={20}
            height={13}
            className="rounded-sm object-cover"
          />
          <span>{t("language.turkish")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
          onClick={() => handleLanguageChange("en")}
        >
          <Image
            src="/images/en-flag.png"
            alt="English Flag"
            width={20}
            height={13}
            className="rounded-sm object-cover"
          />
          <span>{t("language.english")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
