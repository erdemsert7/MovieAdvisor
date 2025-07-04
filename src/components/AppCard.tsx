import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AppCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`relative mx-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl p-5 sm:p-8 md:p-10 ring-1 ring-gray-200 dark:ring-gray-700 min-h-[320px] sm:min-h-[400px] md:min-h-[440px] flex flex-col justify-center items-center text-center gap-5 sm:gap-7 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-100 dark:bg-blue-900 rounded-full blur-2xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-100 dark:bg-purple-900 rounded-full blur-2xl opacity-40 animate-pulse" />
      </div>
      {children}
    </motion.div>
  );
}
