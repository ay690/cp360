import React from "react";
import { Calendar, BarChart3, TrendingUp } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Calendar Dashboard
              </h1>
              <p className="text-blue-100 text-sm sm:text-base">
                Interactive data visualization and calendar management
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-blue-100">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-medium">Data Visualization</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
