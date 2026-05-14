import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

const mockData: CandlestickData[] = [
  { time: '2024-05-01', open: 62000, high: 63500, low: 61500, close: 63000 },
  { time: '2024-05-02', open: 63000, high: 64000, low: 62800, close: 63800 },
  { time: '2024-05-03', open: 63800, high: 64500, low: 63500, close: 64200 },
  { time: '2024-05-04', open: 64200, high: 64800, low: 64000, close: 64500 },
  { time: '2024-05-05', open: 64500, high: 65000, low: 64200, close: 64800 },
  { time: '2024-05-06', open: 64800, high: 65500, low: 64600, close: 65200 },
  { time: '2024-05-07', open: 65200, high: 65800, low: 65000, close: 65600 },
  { time: '2024-05-08', open: 65600, high: 66000, low: 65400, close: 65800 },
  { time: '2024-05-09', open: 65800, high: 66500, low: 65700, close: 66300 },
  { time: '2024-05-10', open: 66300, high: 67000, low: 66100, close: 66800 },
];

export const TradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        backgroundColor: 'transparent',
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      crosshair: {
        mode: 0,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(mockData);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden" ref={chartContainerRef} />
  );
};
