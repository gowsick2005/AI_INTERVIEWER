"use client";

export default function SkillHeatmap() {
  const skills = ["Action", "Call", "Testing", "Gaming", "Personal", "Network", "Developing"];
  const cols = 15;
  const rows = 7;

  const getHeatColor = (intensity: number) => {
    if (intensity > 0.8) return "bg-[#FACC15]";
    if (intensity > 0.6) return "bg-[#FACC15]/80";
    if (intensity > 0.4) return "bg-[#FACC15]/50";
    if (intensity > 0.2) return "bg-[#EF4444]/60";
    return "bg-white/10";
  };

  return (
    <div className="glass p-6 rounded-2xl h-full">
      <h3 className="text-sm font-semibold mb-4">Skill Heatmap Preview</h3>

      <div className="space-y-2">
        {skills.map((skill, row) => (
          <div key={skill} className="flex items-center gap-3 w-full">
            <span className="text-xs w-20 flex-shrink-0 text-slate-300 truncate">{skill}</span>
            <div className="flex gap-1 overflow-x-auto scrollbar-none pb-0.5 w-full">
              {Array.from({ length: cols }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm flex-shrink-0 ${getHeatColor(
                    (Math.sin(row + col) + 1) / 2 * 0.8 + Math.random() * 0.2
                  )}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-white/10 rounded-sm" />
          <span className="text-slate-400">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#EF4444]/60 rounded-sm" />
          <span className="text-slate-400">Mid</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#FACC15] rounded-sm" />
          <span className="text-slate-400">High</span>
        </div>
      </div>
    </div>
  );
}
