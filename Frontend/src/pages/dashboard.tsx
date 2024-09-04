import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import dynamic from 'next/dynamic';

const CandlestickChart = dynamic(() => import('./CandlestickChart'), {
  ssr: false, // This disables server-side rendering for this component
});

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Dashboard: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [barChartData, setBarChartData] = useState<any>(null);
  const [pieChartData, setPieChartData] = useState<any>(null);
  const [candlestickData, setCandlestickData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for Line Chart
        const lineResponse = await fetch('http://localhost:8000/api/line-chart-data/');
        const lineData = await lineResponse.json();
        setLineChartData({
          labels: lineData.labels,
          datasets: [
            {
              label: 'Line Chart',
              data: lineData.data,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });

        // Fetch data for Bar Chart
        const barResponse = await fetch('http://localhost:8000/api/bar-chart-data/');
        const barData = await barResponse.json();
        setBarChartData({
          labels: barData.labels,
          datasets: [
            {
              label: 'Bar Chart',
              data: barData.data,
              backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
              borderColor: 'rgba(255,99,132,1)',
            },
          ],
        });

        // Fetch data for Pie Chart
        const pieResponse = await fetch('http://localhost:8000/api/pie-chart-data/');
        const pieData = await pieResponse.json();
        setPieChartData({
          labels: pieData.labels,
          datasets: [
            {
              label: 'Pie Chart',
              data: pieData.data,
              backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
            },
          ],
        });

        // Fetch data for Candlestick Chart
        const candlestickResponse = await fetch('http://localhost:8000/api/candlestick-data/');
        const candlestickData = await candlestickResponse.json();

        setCandlestickData(candlestickData.data.map((item: any) => ({
          x: item.x,
          y: [item.open, item.high, item.low, item.close]
        })));
      } catch (error) {
        setError('Failed to load chart data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Line Chart</h2>
          {lineChartData ? <Line data={lineChartData} /> : <p>Loading...</p>}
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
          {barChartData ? <Bar data={barChartData} /> : <p>Loading...</p>}
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
          {pieChartData ? <Pie data={pieChartData} /> : <p>Loading...</p>}
        </div>
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Candlestick Chart</h2>
          <CandlestickChart data={candlestickData}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
