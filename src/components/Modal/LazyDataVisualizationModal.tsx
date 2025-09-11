import React, { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";

// Lazy load the modal component just like the calendar component
const DataVisualizationModal = lazy(() => import("./DataVisualizationModal"));

const ModalLoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl p-8">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading Visualization
        </h3>
        <p className="text-gray-600">Preparing your data charts...</p>
      </div>
    </div>
  </div>
);

const LazyDataVisualizationModal: React.FC = () => {
  const { isModalOpen } = useAppSelector((state) => state.calendar);

  if (!isModalOpen) return null;

  return (
    <Suspense fallback={<ModalLoadingSpinner />}>
      <DataVisualizationModal />
    </Suspense>
  );
};

export default LazyDataVisualizationModal;
