import UploadCard from "../components/UploadCard";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";
import ATSScorecard from "../components/ATSScorecard";
import SkillHeatmap from "../components/SkillHeatmap";
import MarketTrends from "../components/MarketTrends";
import AIFeedbackSnippets from "../components/AIFeedbackSnippets";
import ChatAssistant from "../components/ChatAssistant";

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#000000] text-white">
      <BackgroundEffects />

      <Navbar />

      {/* Spacious widescreen grid container with robust responsive top padding to clear fixed header */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-24 relative z-10">
        
        {/* Command Center Card - Responsive padding & radius */}
        <section className="rounded-3xl sm:rounded-[40px] border border-white/10 bg-[#121212] p-5 sm:p-8 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.85)]">
          <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FACC15]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[#FACC15] ring-1 ring-[#FACC15]/20 w-fit">
                New design • Resume analysis reimagined
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Your AI <span className="text-[#FACC15]">Resume</span> Command Center
              </h1>

              <p className="max-w-2xl text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg">
                Upload, analyze, and optimize resumes with rich AI insights, ATS-ready recommendations, and recruiter-focused skills intelligence.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="inline-flex items-center justify-center rounded-2xl bg-[#FACC15] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FACC15]/20 transition hover:bg-[#FACC15]/90 cursor-pointer">
                  Upload Resume
                </button>
                <button className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer">
                  View Analysis
                </button>
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#FACC15]">Active Resume Score</p>
                <div className="mt-3 text-4xl sm:text-5xl font-black">87%</div>
                <p className="mt-2 text-sm text-slate-400">AI confidence that your resume passes ATS and recruiter checks.</p>
              </div>

              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#EF4444]">Insights Delivered</p>
                <div className="mt-3 text-4xl sm:text-5xl font-black">23</div>
                <p className="mt-2 text-sm text-slate-400">Skills, readability, formatting, and ATS suggestions generated instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard grid columns */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] mt-10">
          <div className="space-y-6">
            <UploadCard />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass rounded-3xl p-6">
                <h2 className="text-base font-semibold text-slate-100 mb-4">Today's Highlights</h2>
                <div className="space-y-3">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Best Match</p>
                    <div className="mt-2 text-base font-semibold text-white">Frontend Developer</div>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs text-slate-400">ATS Compatibility</p>
                    <div className="mt-2 text-base font-semibold text-white">Full score coverage in top 5 keywords</div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-100 mb-4">Fast Actions</h2>
                  <div className="grid gap-3">
                    <button className="rounded-2xl bg-[#FACC15]/10 px-4 py-3 text-left text-sm font-semibold text-[#FACC15] hover:bg-[#FACC15]/15 transition cursor-pointer">
                      Optimize resume for ATS
                    </button>
                    <button className="rounded-2xl bg-[#EF4444]/10 px-4 py-3 text-left text-sm font-semibold text-[#EF4444] hover:bg-[#EF4444]/15 transition cursor-pointer">
                      Review recruiter keywords
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ATSScorecard />
            <SkillHeatmap />
          </div>
        </div>

        {/* Grid Footer Highlights */}
        <div className="grid gap-6 lg:grid-cols-2 mt-8">
          <AIFeedbackSnippets />
          <MarketTrends />
        </div>
      </div>

      <ChatAssistant />
    </main>
  );
}