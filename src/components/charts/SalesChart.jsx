import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registro de los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function SalesChart({ data, labels, chartTitle, datasetLabel = 'Ventas' }) {
    const chartRef = useRef(null);

    useEffect(() => {
        // Cleanup function para destruir el chart cuando el componente se desmonte
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    if (!data || !labels || data.length === 0 || labels.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded text-white">
                <p>No hay datos para mostrar</p>
            </div>
        );
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: datasetLabel,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que el gráfico se adapte al tamaño del contenedor
        plugins: {
            title: {
                display: true,
                text: chartTitle,
                color: 'white', // Color del título del gráfico
                font: { size: 18 }
            },
            legend: {
                labels: {
                    color: 'white' // Color de la leyenda
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' }, // Color de las etiquetas del eje X
                grid: { color: 'rgba(255,255,255,0.1)' } // Color de la cuadrícula
            },
            y: {
                ticks: { color: 'white' }, // Color de las etiquetas del eje Y
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };

    return (
        <div className="h-full w-full"> {/* Contenedor para el gráfico */}
            <Bar ref={chartRef} data={chartData} options={options} />
        </div>
    );
}