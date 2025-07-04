"use client";

import { useLanguage } from "@/context/languageContext";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme } = useTheme();

  const activeBg = resolvedTheme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const hoverBg =
    resolvedTheme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const textColor = resolvedTheme === "dark" ? "text-white" : "text-gray-900";

  const getMenuItemClass = (lang: string) => {
    const isActive = language === lang;
    return [
      "flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors mb-1",
      isActive ? `${activeBg} font-semibold` : hoverBg,
      textColor,
    ].join(" ");
  };

  const flagSrc =
    language === "tr" ? "/images/tr-flag.png" : "/images/en-flag.png";
  const flagAlt = language === "tr" ? "Turkish Flag" : "English Flag";
  const flagLabel = language === "tr" ? "TR" : "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 p-2 "
        >
          <Image
            src={flagSrc}
            alt={flagAlt}
            width={50}
            height={35}
            className="rounded-sm object-cover"
          />
          <span className="text-xs font-medium hidden sm:inline">
            {flagLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`w-32 p-1 ${
          resolvedTheme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        } rounded-md shadow-lg`}
      >
        <DropdownMenuItem
          onClick={() => setLanguage("tr")}
          className={getMenuItemClass("tr")}
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
          onClick={() => setLanguage("en")}
          className={getMenuItemClass("en")}
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
