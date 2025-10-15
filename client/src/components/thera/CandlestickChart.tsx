import { useMemo } from "react";

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface CandlestickChartProps {
  data: CandleData[];
  height?: number;
  showVolume?: boolean;
}

export default function CandlestickChart({ data, height = 300, showVolume = true }: CandlestickChartProps) {
  const { candles, minPrice, maxPrice, priceRange, maxVolume } = useMemo(() => {
    if (!data || data.length === 0) return { candles: [], minPrice: 0, maxPrice: 0, priceRange: 0, maxVolume: 0 };
    
    const prices = data.flatMap(d => [d.high, d.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const padding = range * 0.08;
    
    const volumes = data.map(d => d.volume || 0);
    const maxVol = Math.max(...volumes);
    
    return {
      candles: data,
      minPrice: min - padding,
      maxPrice: max + padding,
      priceRange: range + (padding * 2) || 1, // Previne divisão por zero
      maxVolume: maxVol
    };
  }, [data]);

  const chartHeight = showVolume ? height * 0.75 : height;
  const volumeHeight = showVolume ? height * 0.25 : 0;

  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * chartHeight;
  };

  // Use viewBox com largura fixa para garantir renderização consistente
  const viewBoxWidth = 100;
  const paddingLeft = 8;
  const paddingRight = 2;
  const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
  
  const candleWidth = Math.max(0.5, Math.min(2, (chartWidth / candles.length) * 0.6));
  const spacing = chartWidth / candles.length;

  return (
    <div className="relative w-full bg-[#0a0f1a]" style={{ height }}>
      {/* Main chart with candles */}
      <svg 
        className="absolute inset-0 w-full" 
        style={{ height: chartHeight }}
        viewBox={`0 0 ${viewBoxWidth} ${chartHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(198,168,107,0.05)" />
            <stop offset="100%" stopColor="rgba(198,168,107,0)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines - horizontal */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => {
          const y = chartHeight * ratio;
          const price = maxPrice - (priceRange * ratio);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={viewBoxWidth - paddingRight}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
              <text
                x={paddingLeft - 0.5}
                y={y + 1}
                fill="rgba(255,255,255,0.4)"
                fontSize="3"
                fontFamily="monospace"
                textAnchor="end"
              >
                {price.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {candles.map((candle, i) => {
          const x = paddingLeft + (i * spacing) + (spacing / 2);
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? "#10b981" : "#ef4444";
          
          const openY = getY(candle.open);
          const closeY = getY(candle.close);
          const highY = getY(candle.high);
          const lowY = getY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY) || 0.5;

          return (
            <g key={i}>
              {/* Wick (high-low line) */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="0.15"
                opacity="0.8"
              />
              
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                stroke={color}
                strokeWidth="0.1"
                opacity="0.9"
              />
            </g>
          );
        })}
      </svg>

      {/* Volume bars */}
      {showVolume && (
        <svg 
          className="absolute bottom-0 w-full" 
          style={{ height: volumeHeight, top: chartHeight }}
          viewBox={`0 0 ${viewBoxWidth} ${volumeHeight}`}
          preserveAspectRatio="none"
        >
          {candles.map((candle, i) => {
            const x = paddingLeft + (i * spacing) + (spacing / 2);
            const isGreen = candle.close >= candle.open;
            const color = isGreen ? "#10b981" : "#ef4444";
            const volume = candle.volume || 0;
            const barHeight = (volume / maxVolume) * volumeHeight * 0.9;
            
            return (
              <rect
                key={i}
                x={x - candleWidth / 2}
                y={volumeHeight - barHeight}
                width={candleWidth}
                height={barHeight}
                fill={color}
                opacity="0.3"
              />
            );
          })}
          
          {/* Volume axis label */}
          <text
            x="2"
            y={volumeHeight - 2}
            fill="rgba(255,255,255,0.3)"
            fontSize="3"
            fontFamily="monospace"
          >
            Vol
          </text>
        </svg>
      )}

      {/* Current price indicator */}
      {candles.length > 0 && (
        <div 
          className="absolute right-2 bg-[#c6a86b] text-[#0f1a2a] px-2 py-0.5 rounded text-xs font-semibold pointer-events-none"
          style={{ top: getY(candles[candles.length - 1].close) - 10 }}
        >
          {candles[candles.length - 1].close.toFixed(0)}
        </div>
      )}
    </div>
  );
}
