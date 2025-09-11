import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X, AlertCircle, BarChart3 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/slices/calendarSlice';
import type { UserData } from '../../types';

interface ChartData {
  name: string;
  value: number;
}

const DataVisualizationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, selectedDate, selectedData } = useAppSelector((state) => state.calendar);

  const chartData: ChartData[] = useMemo(() => {
    if (!selectedData || selectedData.length === 0) return [];
    
    return selectedData.map((userData: UserData) => {
      const [userName, value] = Object.entries(userData)[0];
      return {
        name: userName,
        value: value,
      };
    });
  }, [selectedData]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const hasData = chartData.length > 0;
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  const averageValue = hasData ? Math.round(totalValue / chartData.length) : 0;

  if (!isModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Data Visualization
              </h3>
              <p className="text-sm text-gray-600">
                {selectedDate && `Data for ${selectedDate}`}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white rounded-lg transition-colors duration-200 group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {hasData ? (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-600">Total Entries</div>
                  <div className="text-2xl font-bold text-blue-900">{chartData.length}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-600">Total Value</div>
                  <div className="text-2xl font-bold text-green-900">{totalValue}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm font-medium text-purple-600">Average Value</div>
                  <div className="text-2xl font-bold text-purple-900">{averageValue}</div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">User-wise Data Distribution</h4>
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        stroke="#6b7280"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#6b7280"
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                        labelStyle={{ color: '#374151', fontWeight: '600' }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '14px', color: '#374151' }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                        name="Value"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Data</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium text-gray-700">User</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-700">Value</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-700">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors">
                          <td className="py-2 px-3 font-medium text-gray-900">{item.name}</td>
                          <td className="py-2 px-3 text-right text-gray-700">{item.value}</td>
                          <td className="py-2 px-3 text-right text-gray-600">
                            {((item.value / totalValue) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* No Data Warning */
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-orange-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                No Data Found
              </h4>
              <p className="text-gray-600 max-w-md mx-auto">
                No data found for the selected date <strong>{selectedDate}</strong>. 
                Please select a date that contains data entries.
              </p>
            </div>
          )}
        </div>

     
        
      </div>
    </div>
  );
};

export default DataVisualizationModal;