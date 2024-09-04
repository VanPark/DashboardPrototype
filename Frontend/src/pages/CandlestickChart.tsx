import React from 'react';
import Chart from 'react-apexcharts';

interface CandlestickChartProps {
  data: {
    x: string; //The Date
    y: [number, number, number, number]; // [open, high, low, close]
  }[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Price',
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#65b6ba', // Color for upward (bullish) candles
          downward: '#9a4945' // Color for downward (bearish) candles
        },
        wick: {
          useFillColor: true // Use the fill color for the wick
        }
      }
    },
  };

  const series = [
    {
      name: 'Candlestick',
      data: data || [],
    },
  ];

  return <Chart options={options} series={series} type="candlestick" height={950} />;
};

export default CandlestickChart;
