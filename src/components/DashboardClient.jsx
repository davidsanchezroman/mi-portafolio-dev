import React from 'react';
import { SalesChart } from './charts/SalesChart.jsx';
import { PieChart } from './charts/PieChart.jsx';
import { ChartWrapper } from './ChartWrapper.jsx';

export function DashboardClient({ processedData }) {
  const monthlyLabels = processedData?.monthly?.labels || [];
  const monthlySales = processedData?.monthly?.data || [];
  const categoryLabels = processedData?.category?.labels || [];
  const categorySales = processedData?.category?.data || [];
  const sellerLabels = processedData?.sellers?.labels || [];
  const sellerSales = processedData?.sellers?.data || [];
  const summary = processedData?.summary;

  // Si no hay datos, mostrar mensaje
  if (!processedData || monthlyLabels.length === 0) {
    return (
      <div className="text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard de Ventas</h2>
        <p>No hay datos disponibles para mostrar gráficos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 text-white">
      <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border">
        <h3 className="text-xl font-bold mb-4 text-center">Ventas Mensuales</h3>
        <ChartWrapper>
          <SalesChart
            labels={monthlyLabels}
            data={monthlySales}
            chartTitle="Evolución de Ventas por Mes"
            datasetLabel="Ventas ($)"
          />
        </ChartWrapper>
      </div>
      <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border">
        <h3 className="text-xl font-bold mb-4 text-center">Ventas por Categoría</h3>
        <ChartWrapper>
          <PieChart
            labels={categoryLabels}
            data={categorySales}
            chartTitle="Distribución por Categorías"
          />
        </ChartWrapper>
      </div>
      <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border">
        <h3 className="text-xl font-bold mb-4 text-center">Top 3 Vendedores</h3>
        <ChartWrapper>
          <PieChart
            labels={sellerLabels}
            data={sellerSales}
            chartTitle="Mejores Vendedores"
          />
        </ChartWrapper>
      </div>
      <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border text-center">
        <h3 className="text-xl font-bold mb-4">Resumen</h3>
        <div className="space-y-3">
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Total Ventas</p>
            <p className="text-2xl font-bold text-green-400">${summary?.totalSales?.toLocaleString?.() ?? 0}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Total Unidades</p>
            <p className="text-2xl font-bold text-blue-400">{summary?.totalUnits ?? 0}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Promedio por Venta</p>
            <p className="text-2xl font-bold text-purple-400">${summary?.averageSale ?? 0}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Productos Únicos</p>
            <p className="text-2xl font-bold text-orange-400">{summary?.uniqueProducts ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}