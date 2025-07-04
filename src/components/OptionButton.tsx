import { LucideIcon } from "lucide-react";

type Variant = "select";

interface OptionButtonProps {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
}

export default function OptionButton({
  label,
  Icon,
  onClick,
  selected = false,
  disabled = false,
  variant = "select",
  className = "",
}: OptionButtonProps) {
  const baseStyles =
    "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all";

  const variants = {
    select: selected
      ? "bg-blue-500 text-white border border-blue-600 shadow-lg scale-[1.02]"
      : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}
