"use client";

import { Button } from "./Button";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <AlertTriangle className="w-6 h-6" />;
      case "warning":
        return <AlertCircle className="w-6 h-6" />;
      case "success":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  const getIconColors = () => {
    switch (variant) {
      case "destructive":
        return "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400";
      case "warning":
        return "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400";
      case "success":
        return "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400";
      default:
        return "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400";
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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative px-6 pt-6 pb-4">
                {showClose && (
                  <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    aria-label="Kapat"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </button>
                )}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${getIconColors()}`}
                  >
                    {getIcon()}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                  {title}
                </h3>
                {description && (
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1 h-11 text-base font-medium bg-transparent"
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    variant={getConfirmButtonVariant()}
                    onClick={onConfirm}
                    className="flex-1 h-11 text-base font-medium"
                  >
                    {confirmLabel}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
