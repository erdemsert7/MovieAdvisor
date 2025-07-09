"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

type Variant = "select" | "multiSelect";

interface OptionButtonProps {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  variant?: Variant;
  multiSelect?: boolean;
  className?: string;
  compact?: boolean;
}

export default function OptionButton({
  label,
  Icon,
  onClick,
  selected = false,
  disabled = false,
  multiSelect = false,
  className = "",
  compact = false,
}: OptionButtonProps) {
  const baseStyles = compact
    ? "flex items-center gap-1.5 px-2 py-2 rounded-lg font-medium transition-all duration-200 relative text-xs sm:text-sm min-h-[40px]"
    : "flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 relative text-sm min-h-[44px]";

  const getVariantStyles = () => {
    if (multiSelect) {
      return selected
        ? "bg-blue-500 text-white border-2 border-blue-600 shadow-lg scale-[1.02] ring-2 ring-blue-200"
        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500";
    } else {
      return selected
        ? "bg-blue-500 text-white border-2 border-blue-600 shadow-lg scale-[1.02]"
        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600";
    }
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer hover:shadow-md";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${getVariantStyles()} ${disabledStyles} ${className} w-full`}
      title={label}
    >
      <Icon size={compact ? 14 : 16} className="flex-shrink-0" />
      <span className="flex-1 text-left truncate leading-tight">{label}</span>
      {multiSelect && selected && (
        <Check size={compact ? 12 : 14} className="flex-shrink-0 text-white" />
      )}
    </button>
  );
}
