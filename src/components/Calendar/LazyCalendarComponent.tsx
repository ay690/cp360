import React, { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Lazy load the calendar 
const CalendarComponent = lazy(() => import("./CalendarComponent"));

const CalendarLoadingSpinner: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading Calendar
        </h3>
        <p className="text-gray-600">
          Please wait while we prepare your calendar...
        </p>
      </div>
    </div>
  </div>
);

const LazyCalendarComponent: React.FC = () => {
  return (
    <Suspense fallback={<CalendarLoadingSpinner />}>
      <CalendarComponent />
    </Suspense>
  );
};

export default LazyCalendarComponent;
