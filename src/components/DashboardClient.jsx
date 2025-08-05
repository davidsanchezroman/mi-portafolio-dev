import React, { useEffect, useState } from 'react';
import { SalesChart } from './charts/SalesChart.jsx';
import { PieChart } from './charts/PieChart.jsx';
import { ChartWrapper } from './ChartWrapper.jsx';

export function DashboardClient({ salesData }) {
  // Si no hay datos, mostrar mensaje
  if (!salesData || salesData.length === 0) {
    return (
      <div className="text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard de Ventas</h2>
        <p>No hay datos disponibles para mostrar gráficos.</p>
      </div>
    );
  }

  // Procesamiento de datos con validación
  const salesByMonth = {};
  const salesByCategory = {};
  const salesBySeller = {};
  let totalSales = 0;
  let totalUnits = 0;
  const products = new Set();

  for (const item of salesData) {
    // Validar y procesar cada campo con valores por defecto
    const month = item.date ? item.date.substring(0, 7) : 'Sin fecha';
    const sales = item.sales || item.amount || 0;
    const units = item.units || item.quantity || 0;
    const category = item.category || 'Sin categoría';
    const seller = item.seller || item.salesperson || 'Sin vendedor';
    const product = item.product || item.item || 'Sin producto';

    salesByMonth[month] = (salesByMonth[month] || 0) + sales;
    salesByCategory[category] = (salesByCategory[category] || 0) + sales;
    salesBySeller[seller] = (salesBySeller[seller] || 0) + sales;
    totalSales += sales;
    totalUnits += units;
    products.add(product);
  }

  const monthlyLabels = Object.keys(salesByMonth).sort();
  const monthlySales = monthlyLabels.map(m => salesByMonth[m]);

  const categoryLabels = Object.keys(salesByCategory);
  const categorySales = categoryLabels.map(k => salesByCategory[k]);

  const topSellers = Object.entries(salesBySeller).sort(([, a], [, b]) => b - a).slice(0, 3);
  const sellerLabels = topSellers.map(([s]) => s);
  const sellerSales = topSellers.map(([, s]) => s);

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
            <p className="text-2xl font-bold text-green-400">${totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Total Unidades</p>
            <p className="text-2xl font-bold text-blue-400">{totalUnits}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Promedio por Venta</p>
            <p className="text-2xl font-bold text-purple-400">${Math.round(totalSales / salesData.length)}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Productos Únicos</p>
            <p className="text-2xl font-bold text-orange-400">{products.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}