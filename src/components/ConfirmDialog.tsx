"use client";

import { Button } from "@/components/button";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  showClose?: boolean;
  variant?: "default" | "destructive" | "warning" | "success";
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Evet",
  cancelLabel = "Hayır",
  onConfirm,
  onCancel,
  showClose = true,
  variant = "default",
}: ConfirmDialogProps) {
  if (!open) return null;

  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <AlertTriangle className="w-7 h-7" />;
      case "warning":
        return <AlertCircle className="w-7 h-7" />;
      case "success":
        return <CheckCircle className="w-7 h-7" />;
      default:
        return <Info className="w-7 h-7" />;
    }
  };

  const getIconColors = () => {
    switch (variant) {
      case "destructive":
        return "bg-gradient-to-br from-red-100 to-red-200 text-red-600 shadow-red-200/50";
      case "warning":
        return "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 shadow-orange-200/50";
      case "success":
        return "bg-gradient-to-br from-green-100 to-green-200 text-green-600 shadow-green-200/50";
      default:
        return "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-blue-200/50";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case "destructive":
        return "destructive";
      case "warning":
        return "warning";
      case "success":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Ultra modern backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-500"
        onClick={onCancel}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Modern glassmorphism dialog */}
      <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md transform transition-all duration-500 scale-100 border border-white/20 animate-slideIn">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/20 rounded-3xl pointer-events-none" />

        {/* Close button */}
        {showClose && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300 group backdrop-blur-sm border border-gray-200/50 hover:scale-110"
            aria-label="Kapat"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
          </button>
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Modern icon with floating effect */}
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${getIconColors()} animate-float`}
          >
            {getIcon()}
          </div>

          {/* Title with modern typography */}
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-sm font-medium">
              {description}
            </p>
          )}

          {/* Modern button layout */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              variant="outline"
              className="flex-1 py-4 text-base font-semibold"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={getConfirmButtonVariant()}
              className="flex-1 py-4 text-base font-semibold"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Responsive mobile optimizations */
        @media (max-width: 640px) {
          .animate-slideIn {
            animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
        }
      `}</style>
    </div>
  );
}
