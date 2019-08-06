import React from 'react';
import { GGPLOT } from 'react-d3-ggplot';
import { Line } from 'react-d3-ggplot';
import { useDimensions } from '../../hooks/';
import { useHistoricalData } from '../../hooks/';

const HistoricalChart = () => {
  const historicalData = useHistoricalData();
  const dimensions = useDimensions();

  if (!historicalData) return null;

  return (
    <GGPLOT data={historicalData} aes={['date', 'close']} dimensions={dimensions}>
      <Line />
    </GGPLOT>
  );
};

export default HistoricalChart;