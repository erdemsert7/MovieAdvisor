import React from "react";

interface StepperProps {
  total: number;
  step: number;
}

const Stepper: React.FC<StepperProps> = ({ total, step }) => (
  <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8">
    {Array.from({ length: total }).map((_, idx) => (
      <div key={idx} className="flex items-center">
        <div
          className={
            `flex items-center justify-center rounded-full border-2 transition-all ` +
            (idx < step
              ? "bg-blue-500 border-blue-500 text-white"
              : idx === step
              ? "bg-white dark:bg-gray-900 border-blue-500 text-blue-600 dark:text-blue-300 ring-2 ring-blue-300 dark:ring-blue-700"
              : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400")
          }
          style={{ minWidth: "28px", height: "28px", padding: "2px" }}
        >
          {idx < step ? (
            <svg
              className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span className="text-xs sm:text-sm md:text-base font-bold">
              {idx + 1}
            </span>
          )}
        </div>
        {idx < total - 1 && (
          <div
            className="h-1 sm:h-1.2 md:h-1.5 w-4 sm:w-6 md:w-8 bg-gray-300 dark:bg-gray-700 mx-0.5 sm:mx-1 md:mx-2 flex-1"
            style={{ transition: "all 0.3s" }}
          />
        )}
      </div>
    ))}
  </div>
);

export default Stepper;
