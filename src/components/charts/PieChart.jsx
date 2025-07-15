import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ data, labels, chartTitle }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [ // Colores para las secciones del pastel
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: chartTitle,
                color: 'white',
                font: { size: 18 }
            },
            legend: {
                position: 'right', // Posiciona la leyenda a la derecha
                labels: {
                    color: 'white'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let sum = 0;
                        let dataArr = context.dataset.data;
                        dataArr.map(data => { sum += data; });
                        let percentage = (context.parsed / sum * 100).toFixed(2) + '%';
                        return `${context.label}: ${context.parsed.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} (${percentage})`;
                    }
                }
            }
        }
    };

    return (
        <div className="h-full w-full">
            <Pie data={chartData} options={options} />
        </div>
    );
}