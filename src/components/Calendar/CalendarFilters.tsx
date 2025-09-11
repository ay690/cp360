import React from 'react';
import { Filter, Calendar, AlertCircle } from 'lucide-react';

export type FilterType = 'all' | 'with-data' | 'without-data';

interface CalendarFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalDates: number;
  datesWithData: number;
  datesWithoutData: number;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  activeFilter,
  onFilterChange,
  totalDates,
  datesWithData,
  datesWithoutData,
}) => {
  const filters = [
    {
      key: 'all' as FilterType,
      label: 'All Dates',
      icon: Calendar,
      count: totalDates,
      color: 'bg-gray-100 text-gray-700 border-gray-300',
      activeColor: 'bg-gray-600 text-white border-gray-600',
    },
    {
      key: 'with-data' as FilterType,
      label: 'Dates with Data',
      icon: Calendar,
      count: datesWithData,
      color: 'bg-blue-50 text-blue-700 border-blue-300',
      activeColor: 'bg-blue-600 text-white border-blue-600',
    },
    {
      key: 'without-data' as FilterType,
      label: 'Dates without Data',
      icon: AlertCircle,
      count: datesWithoutData,
      color: 'bg-orange-50 text-orange-700 border-orange-300',
      activeColor: 'bg-orange-600 text-white border-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Calendar</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.key;
          
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
                flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                ${isActive ? filter.activeColor : filter.color}
              `}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{filter.label}</span>
              </div>
              <span className={`
                px-2 py-1 rounded-full text-xs font-bold
                ${isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-700'}
              `}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarFilters;