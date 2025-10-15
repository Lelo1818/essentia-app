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
}

export default function CandlestickChart({ data, height = 300 }: CandlestickChartProps) {
  const { candles, minPrice, maxPrice, priceRange } = useMemo(() => {
    if (!data || data.length === 0) return { candles: [], minPrice: 0, maxPrice: 0, priceRange: 0 };
    
    const prices = data.flatMap(d => [d.high, d.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const padding = range * 0.1;
    
    return {
      candles: data,
      minPrice: min - padding,
      maxPrice: max + padding,
      priceRange: range + (padding * 2)
    };
  }, [data]);

  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * height;
  };

  const candleWidth = Math.max(8, Math.min(20, (800 / candles.length) - 4));
  const spacing = candleWidth + 4;

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ height }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Horizontal price lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height * ratio;
          const price = maxPrice - (priceRange * ratio);
          return (
            <g key={i}>
              <line
                x1="0"
                y1={y}
                x2="100%"
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x="8"
                y={y - 4}
                fill="rgba(255,255,255,0.5)"
                fontSize="11"
                fontFamily="monospace"
              >
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {candles.map((candle, i) => {
          const x = 60 + (i * spacing);
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? "#10b981" : "#ef4444";
          
          const openY = getY(candle.open);
          const closeY = getY(candle.close);
          const highY = getY(candle.high);
          const lowY = getY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY) || 1;

          return (
            <g key={i}>
              {/* Wick (high-low line) */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="1.5"
              />
              
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                stroke={color}
                strokeWidth="1"
              />
            </g>
          );
        })}
      </svg>

      {/* Price labels on right */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2 pr-2 text-xs text-white/50 font-mono">
        {[maxPrice, maxPrice - priceRange * 0.25, maxPrice - priceRange * 0.5, maxPrice - priceRange * 0.75, minPrice].map((price, i) => (
          <div key={i}>{price.toFixed(2)}</div>
        ))}
      </div>
    </div>
  );
}
