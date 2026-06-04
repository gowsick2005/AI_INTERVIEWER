"use client";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute left-[-15%] top-[-10%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.06),_transparent_35%)] blur-3xl opacity-75" />
      <div className="absolute right-[-10%] top-[16%] w-[440px] h-[440px] rounded-full bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.04),_transparent_34%)] blur-3xl opacity-68" />
      <div className="absolute left-[8%] bottom-[12%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.04),_transparent_34%)] blur-3xl opacity-55" />

      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] md:w-[560px] md:h-[560px] bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.05),_transparent_40%)] blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] md:w-[520px] md:h-[520px] bg-[radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.04),_transparent_40%)] blur-3xl rounded-full" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}