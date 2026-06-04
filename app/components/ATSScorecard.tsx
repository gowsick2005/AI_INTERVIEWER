"use client";

export default function ATSScorecard() {
  const score = 85;
  const metrics = [
    { label: "Good", value: 95, color: "bg-[#FACC15]" },
    { label: "High", value: 95, color: "bg-[#FACC15]" },
    { label: "Medium", value: 85, color: "bg-[#FACC15]" },
    { label: "Lower", value: 70, color: "bg-[#EF4444]" },
  ];

  return (
    <div className="glass p-6 rounded-2xl h-full">
      <h3 className="text-sm font-semibold mb-4">Mock ATS Scorecard</h3>
      
      <div className="flex items-center justify-center mb-6 relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="6"
            strokeDasharray={`${(score / 100) * 282} 282`}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="20" fontWeight="bold" fill="white">
            {score}
          </text>
        </svg>
      </div>

      <div className="space-y-2">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${m.color}`} />
              {m.label}
            </span>
            <span className="text-slate-300">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
