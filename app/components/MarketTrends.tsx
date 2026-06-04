"use client";

export default function MarketTrends() {
  const data = [
    { month: "Jan", item1: 45, item2: 32, item3: 28 },
    { month: "Feb", item1: 52, item2: 38, item3: 35 },
    { month: "Mar", item1: 48, item2: 45, item3: 42 },
    { month: "Apr", item1: 61, item2: 55, item3: 50 },
    { month: "May", item1: 70, item2: 65, item3: 62 },
  ];

  const width = 280;
  const height = 120;
  const padding = 20;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const maxValue = 80;

  const getY = (val: number) => padding + graphHeight - (val / maxValue) * graphHeight;
  const getX = (idx: number) => padding + (idx / (data.length - 1)) * graphWidth;

  const createPath = (key: "item1" | "item2" | "item3") => {
    return data
      .map((d, i) => `${getX(i)},${getY(d[key])}`)
      .join(" L ");
  };

  return (
    <div className="glass p-6 rounded-2xl h-full">
      <h3 className="text-sm font-semibold mb-4">Market Trends Insight</h3>

      <div className="flex items-center justify-center gap-3 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#FACC15]" />
          <span>Item 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#EF4444]" />
          <span>Trend 2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-white" />
          <span>Item 3</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={padding + (i * graphHeight) / 3}
            x2={width - padding}
            y2={padding + (i * graphHeight) / 3}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Lines */}
        <polyline points={createPath("item1")} fill="none" stroke="#FACC15" strokeWidth="2" />
        <polyline points={createPath("item2")} fill="none" stroke="#EF4444" strokeWidth="2" />
        <polyline points={createPath("item3")} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text key={`label-${i}`} x={getX(i)} y={height - 5} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  );
}
