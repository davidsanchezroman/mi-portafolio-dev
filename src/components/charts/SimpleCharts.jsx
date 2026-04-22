import React from 'react';

export function SimpleBarChart({ labels, data, title, color = 'bg-blue-500' }) {
  if (!data || data.length === 0 || !labels || labels.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded border border-dark-border">
        <p className="text-sm text-gray-300">No hay datos para mostrar</p>
      </div>
    );
  }
  
  const numericData = data.map((value) => Number(value) || 0);
  const maxValue = Math.max(...numericData, 1);
  
  return (
    <div className="w-full min-h-64 p-3 bg-gray-800 rounded border border-dark-border">
      <h4 className="font-bold mb-4 text-center">{title}</h4>
      <div className="space-y-2">
        {labels.map((label, index) => {
          const value = numericData[index] || 0;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={label} className="flex items-center space-x-2">
              <div className="w-20 text-sm text-right">{label}:</div>
              <div className="flex-1 bg-gray-700 rounded h-6 relative">
                <div 
                  className={`${color} h-full rounded transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  ${value.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SimplePieChart({ labels, data, title }) {
  if (!data || data.length === 0 || !labels || labels.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded border border-dark-border">
        <p className="text-sm text-gray-300">No hay datos para mostrar</p>
      </div>
    );
  }
  
  const numericData = data.map((value) => Number(value) || 0);
  const total = numericData.reduce((sum, value) => sum + value, 0) || 1;
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 
    'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'
  ];
  
  return (
    <div className="w-full min-h-64 p-3 bg-gray-800 rounded border border-dark-border">
      <h4 className="font-bold mb-4 text-center">{title}</h4>
      <div className="space-y-2">
        {labels.map((label, index) => {
          const value = numericData[index] || 0;
          const percentage = ((value / total) * 100).toFixed(1);
          
          return (
            <div key={label} className="flex items-center space-x-2">
              <div className={`w-4 h-4 ${colors[index % colors.length]} rounded`}></div>
              <div className="flex-1 text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-gray-400 ml-2">
                  ${value.toLocaleString()} ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
