import React, { useEffect, useState } from 'react';
import { SalesChart } from './charts/SalesChart.jsx';
import { PieChart } from './charts/PieChart.jsx';

export function DashboardClient() {
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const isDev = import.meta.env.DEV;
        const baseURL = isDev
          ? 'http://localhost:8888/.netlify/functions/sales-data'
          : '/.netlify/functions/sales-data';

        const data = await fetchSalesData(baseURL);
        setSalesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Error al cargar el Dashboard</h1>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-accent-blue hover:bg-accent-blue-dark text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-white text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Dashboard de Ventas</h1>
        <p>Cargando datos...</p>
        <div className="mt-4 animate-spin h-8 w-8 border-4 border-accent-blue border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  // Procesamiento de datos
  const salesByMonth = {};
  const salesByCategory = {};
  const salesBySeller = {};
  let totalSales = 0;
  let totalUnits = 0;
  const products = new Set();

  for (const item of salesData) {
    const month = item.date.substring(0, 7);
    salesByMonth[month] = (salesByMonth[month] || 0) + item.sales;
    salesByCategory[item.category] = (salesByCategory[item.category] || 0) + item.sales;
    salesBySeller[item.seller] = (salesBySeller[item.seller] || 0) + item.sales;
    totalSales += item.sales;
    totalUnits += item.units;
    products.add(item.product);
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
      <div>
        <h3 className="text-xl font-bold mb-2">Ventas Mensuales</h3>
        <SalesChart labels={monthlyLabels} data={monthlySales} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Ventas por Categoría</h3>
        <PieChart labels={categoryLabels} data={categorySales} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Top 3 Vendedores</h3>
        <PieChart labels={sellerLabels} data={sellerSales} />
      </div>
      <div className="bg-dark-surface p-6 rounded-xl shadow-md border border-dark-border text-center">
        <h3 className="text-xl font-bold mb-4">Resumen</h3>
        <p>Total Ventas: ${totalSales.toLocaleString()}</p>
        <p>Total Unidades: {totalUnits}</p>
        <p>Promedio por venta: ${Math.round(totalSales / salesData.length)}</p>
        <p>Productos únicos: {products.size}</p>
      </div>
    </div>
  );
}
